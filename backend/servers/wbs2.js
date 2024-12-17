const express = require('express');
const app=express();
const path=require('path');
const root=require('../routes/root.js');
const subdir=require('../routes/subdir.js');
const log=require('../middleware/logEvents.js');
const api=require('../routes/api/employee.js');
const {connectDB}=require('./db_connection.js');
const PORT=process.env.PORT || 3500;

try{
      connectDB()
    app.use((req,res,next)=>{
        log(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
        console.log(`${req.method} ${req.path}`);
        next();
    })
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use('/',express.static(path.join(__dirname,'./public')));
    app.use(root);
    app.use('/subdir',express.static(path.join(__dirname,'./public')));
    app.use('/subdir',subdir);
    app.use('/employees',api);
    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,'views','404.html'));
    })
}
catch(err)
{
    console.log(err.getContent());
}
app.listen(PORT,()=>{console.log(`Server Running on PORT: ${PORT}`)})
