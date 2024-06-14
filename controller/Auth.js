const User = require("../models/User");
const bcrypt = require("bcrypt");

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