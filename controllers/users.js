const express = require('express');
const controller = express.Router();
const {Users,validationUser} = require('../models/users');

controller.get('/',async (req,res)=>{
    const list =await Users.find().sort('name');
    return res.send(list);
})
controller.post('/',async (req,res)=>{
    const {error} = validationUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // let user = Users.findOne({email:req.body.email});
    // if (user)
    //     return res.status(400).send("Mavjud bolgan account...");
    user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    await user.save();
    res.send(user);
});

module.exports = controller;