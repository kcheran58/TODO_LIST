const express = require('express')
const route = express.Router()
const path= require('path')
const empData=require('../../data/employees.json');
data={}
data.employees = empData;
route.route('/')
     .get((req,res)=>{
        res.json(data);
     })
     .post((req,res)=>{
        res.json({
            "firstName":req.body.firstname,
            "lastName":req.body.lastname
        })
     })
     .put((req,res)=>{
        res.json({
            "firstName":req.body.firstname,
            "lastName":req.body.lastname
        }) })
     .delete((req,res)=>{
        res.json({"id":req.body.id})
     })

     route.route('/:id')
       .get((req,res)=>{
        res.json({"id":req.params.id})
       })
     module.exports=route;