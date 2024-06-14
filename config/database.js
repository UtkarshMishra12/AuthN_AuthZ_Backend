const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => console.log("DB Connected Sucessfully"))
    .catch((error) =>{
        console.error(error);
        console.log("DB Connection Issue");
        process.exit(1);
    })
}

module.exports = dbConnect;