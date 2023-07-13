
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const {connection} = require("./db")
// const {userRouter}=require("./routes/user.routes")
const {userRouter}=require("./routes/user.routes")
const cors=require("cors");
const { employyerouter } = require('./routes/employye.route');
//require("dotenv").config()




const app = express();


// app.use(bodyParser.json());

app.use(cors());
app.use(express.json())
app.use("/users",userRouter)

app.use("/employee",employyerouter)




// for checking
app.get("/",(req,res)=>{
    res.status(200).send("server Running")
})






// running server
app.listen(5000,async(req,res)=>{
    try {
        await connection
        console.log("running on Mongo Atlas")
    } catch (error) {
        console.log({"msg":error.message})
    }
    console.log("running server")
})
