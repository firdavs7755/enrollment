const Joi = require('joi');
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  coursePrice:{
    type:Number,
    required:false
  },
  customer:{
    type:mongoose.Schema({
      name:{type:String},
      isVip:Boolean,
      phone:{type:String,required:true},
      bonusPoints:Number
    })
  },
  course:{
    type:mongoose.Schema({
      title:{
        type:String
      }
    })
  },
  dateStart:{
    type:Date,
    required:false,
    default:Date.now
  }
})
function validationEnrollment(enrollment) {
  const schema = Joi.object({
    customerId:Joi.string().required(),
    courseId:Joi.string().required(),
    coursePrice:Joi.number()
  })
  return schema.validate(enrollment)
}
const Enrollment = mongoose.model('Enrollment',enrollmentSchema);

exports.Enrollment = Enrollment;
exports.validationEnrollment = validationEnrollment;