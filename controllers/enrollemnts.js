const express = require('express');
const mongoose = require('mongoose');
const controller = express.Router();
const {Enrollment,validationEnrollment} = require('../models/enrollment')
const {Course} = require('../models/course')
const {Customer} = require('../models/customer')

controller.get('/',async (req,res)=>{
  const enrollment = await Enrollment.find().sort('coursePrice');
  return res.status(200).send(enrollment);
});
controller.get('/:id',async (req,res)=>{
  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment)
    return res.status(404).send('Такой Энроллмент не сушествуеть');
  res.status(200).send(enrollment);
})

controller.post('/',async (req,res)=>{
  const {error} = validationEnrollment(req.body);
  if (error)
    return res.status(400).send(error.details[0].message)
  const course = await Course.findById(req.body.courseId)
  if (!course)
    return res.status(404).send('Такой курс обекть не сушествуеть!!!')
  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('Такой кустомер обекть не сушествуеть!!!')
  let enrollment = new Enrollment({
    course:{
      _id:req.body.courseId,
      title:course.title
    },
    customer:{
      _id:req.body.customerId,
      name:customer.name,
      isVip:customer.isVip,
      phone:customer.phone,
      bonusPoints:customer.bonusPoints
    },
    coursePrice:req.body.coursePrice
  })
  if(customer.isVip){
    enrollment.coursePrice = enrollment.coursePrice - (enrollment.coursePrice*0.15)
  }

  enrollment = await enrollment.save();
  res.status(200).send(enrollment);
});
controller.delete('/:id', async (req,res)=>{
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment)
      return res.status(404).send('Такой Энроллмент обект не сушествуеть!!!');
    res.status(204).send(enrollment);
})
// controller.put('/:id',async (req,res)=>{
//     const {error} = validationEnrollment(req.body);
//     if (error)
//         return res.status(400).send(error.details[0].message);
//     // const course = await Course.findById(req.body.courseId)
//     let enrollemnt = await Enrollment.findByIdAndUpdate(req.params.id,{
//         coursePrice:req.body.coursePrice,
//
//     })
//
// })

controller.delete('/:id', async (req,res)=>{
  const enrollment = await Enrollment.findByIdAndRemove(req.params.id);
  if (!enrollment)
    return res.status(404).send('Такой обект не сушестьвует!!!')
  res.status(204).send(enrollment)
})


module.exports = controller


