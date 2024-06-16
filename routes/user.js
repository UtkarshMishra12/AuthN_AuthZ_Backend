const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {login, signup} = require("../controller/Auth");
const {auth, isStudent, isAdmin} = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);

router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for TEST",
    });
})


//Protected Route
router.get("/student", auth, isStudent, (req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for students",
    });
})

router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for Admin",
    });
})

// router.get("/getEmail" , auth, async (req,res) => {

//     try{
//         const id = req.user.id;
//         console.log("ID:" , id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the email route',
//         })
//     }
//     catch(error) {
//         res.status(500).json({
//             success:false,
//             error:error.message,
//             message:'Fatt gya code',
//         })
//     }

// });

module.exports = router;