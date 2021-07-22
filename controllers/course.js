const express = require('express');
const controller = express.Router();
const {Course,validationCourse} = require('../models/course');
const {getCourseById,getCourses,addCourse,updateCourse,deleteCourse} = require('../services/cuorseService');

controller.get('/', (req,res)=>{
    getCourses(req, res);
});
controller.get('/:id', (req,res)=>{
     getCourseById(req.params.id,res);
});
controller.post('/', (req,res)=>{
    addCourse(req.body,res);
});
controller.put('/:id', (req,res)=>{
    updateCourse(req.params.id,req.body,res);
})
controller.delete('/:id', (req,res)=>{
    deleteCourse(req.params.id,res);
})

module.exports = controller