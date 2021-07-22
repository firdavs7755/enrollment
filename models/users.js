const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:3, maxlength:50},
    email:{type:String, minlength:5, maxlength: 50, unique:true},
    password:{type:String, required: true, minlength:5, maxlength:1024}
});
const Users = mongoose.model('Users',userSchema);

function validationUser(user) {
    const schema = Joi.object({
        name:Joi.string().required().min(3).max(50),
        email:Joi.string().required().min(5).max(50).email(),
        password:Joi.string().min(5).max(1024).required()
    })
    return schema.validate(user);
}
exports.Users = Users;
exports.validationUser = validationUser;