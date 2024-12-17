const app=require('express');
const mongoose=require('mongoose');

const connectDB= ()=>
    {
        const uri = 'mongodb://localhost:27017/TODO_LIST';
       mongoose.connect(uri)
       .then(()=>{console.log("MongoDB connected sucessfully!")})
       .catch( err =>{
        console.log("MongoDB connection is FAIL!");
       })
    }
module.exports={connectDB,mongoose}