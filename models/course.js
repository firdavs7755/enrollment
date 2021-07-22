const Joi = require('joi');
const mongoose = require('mongoose');

const courseScheme = new mongoose.Schema({
    title: {type:String, required:true}
})

function validationCourse(course) {
    const schema = Joi.object({
        title:Joi.string().required().min(1)
    })
    return schema.validate(course);
}
const Course = mongoose.model('Course',courseScheme);

exports.Course = Course;
exports.validationCourse = validationCourse;