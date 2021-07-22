const express = require('express');
const controller = express.Router();
const {getCustomers,getCustomerById,updateCustomer,deleteCustomer,addCustomer} = require('../services/customerSevice')


controller.get('/', (req,res)=>{
    getCustomers(res);
});
controller.get('/:id', (req,res)=>{
    getCustomerById(req.params.id,res);
});
controller.post('/', (req,res)=>{
    addCustomer(req.body,res);
});
controller.put('/:id', (req,res)=>{
    updateCustomer(req.params.id,req.body,res);
});
controller.delete('/:id', (req,res)=>{
    deleteCustomer(req.params.id,res);
})

module.exports = controller