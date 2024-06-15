const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req,res) =>{
    try{
        //fetch data
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});


        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exist",
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
          return res.status(400).json({
            success:false,
            message:" Error in hashing the password",
          });
        }
        

        //Create entry for user
        const user =  await User.create({
            name,email, password:hashedPassword, role,
        });

        //Another Method for creating user
        // const user = new User({
        //     name,email,password:hashedPassword,role
        // });
        // const data= await user.save();
       
        return res.status(200).json({
            success:true,
            message:"User created successfully",
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:" Error in signing up",
          });
    }
}

//Handles Login
exports.login = async (req,res) => {
    try{
        //fetch data
        const {email,password}= req.body;
        //validate email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill the email and password carefully",
            });
        }
        //check user exist or not
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist",
            });
        }


        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //verify password and generate jwt
        if(await bcrypt.compare(password, user.password) ){
            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET,{
                                    expiresIn:"2h"
                                });

            user = user.toObject();                    
            user.token = token;
            user.password = undefined; 
            console.log(token);
            
            const options = {
                expiresIn: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            
            res.cookie("utkarshCookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in Successfully",
            });
        }
        else{
            //password does not match
            return res.status(500).json({
                success:false,
                message:"Password does not match",
            });
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}
