import express from "express"; 
import mongoose  from "mongoose";
import dotenv from "dotenv";


dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connect success to mongodb")
}).catch(()=>{
    console.log(error)
});
const app = express();


app.get("/",(req,res) => {
    res.send("Hello World")
})


app.listen(3000,() => {
    console.log("Server is running  on 3000" )})

    // Mo5kzVjrVBxJosok