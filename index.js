const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const user =  require("./routes/user");
app.use("/api/v1", user);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, ()=>{
    console.log("Server Started Successfully");
});

app.get("/", (req,res)=>{
    res.send(`<h1>Home Page</h1>`);
})
