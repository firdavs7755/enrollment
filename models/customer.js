const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        required:true
    },
    isVip:{
        type:Boolean,
        required:true
    },
    phone:{
        type:String,
        required:false,
    },
    bonusPoints:{
        type:Number,
        required:false
    }
})

function validationCust(customer) {
    const schema = Joi.object({
        name:Joi.string().min(2).required(),
        isVip:Joi.boolean(),
        phone:Joi.string(),
        bonusPoints:Joi.number()
    })
    return schema.validate(customer)
}
const Customer = mongoose.model('Customer',customerSchema);

exports.Customer = Customer;
exports.validationCustomer = validationCust;