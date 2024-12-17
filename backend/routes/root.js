const express = require("express")
const routes = express.Router()
const path = require("path")

routes.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
})

routes.get('/new',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})
routes.get('/chain', (req, res, next) => {
    console.log('verup ah iruku');
    next();
}, (req, res) => {
    res.send('okk....');
});

module.exports = routes;