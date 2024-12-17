const mongoose = require('mongoose');
const express =require('express')
const app = express();
const connectDB = () => {
    const uri = 'mongodb://localhost:27017/db_connection';
    mongoose.connect(uri)
        .then(() => {
            console.log('MongoDB connected successfully');
            const userSchema = new mongoose.Schema({
                username: String,
                email: String,
                firstName: String,
                lastName: String
              });

              const UserModel = mongoose.model("user",userSchema);
              app.get("/get",async(req,res)=>{
                const userData= await UserModel.find();
                res.json(userData);
              })
              
        })
        .catch(err => console.log('MongoDB connection error:', err));
};

module.exports = {connectDB};
