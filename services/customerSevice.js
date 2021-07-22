const {Customer,validationCustomer} = require('../models/customer');

exports.getCustomers = async (res) => {
  return res.status(200).send(await Customer.find());
}
exports.getCustomerById = async (id,res) => {
  const customer = await Customer.findById(id);
  if (!customer)
    return res.status(404).send('ushbu topilmadi');
  res.status(200).send(customer);

}
exports.addCustomer = async (reqBody,res) => {
  const {error} = validationCustomer(reqBody);
  if (error)
    return res.status(400).send('Что то пошла не так!!!')
  let customer = new Customer({
    name:reqBody.name,
    isVip:reqBody.isVip,
    phone:reqBody.phone,
    bonusPoints:reqBody.bonusPoints
  })
  return res.status(201).send(await customer.save());
}
exports.updateCustomer = async (id,reqBody,res) => {
  const {error} = validationCustomer(reqBody)
  if (error)
    return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(id,{
    name:reqBody.name
  });
  if (!customer)
    return res.status(404).send('такой обект не сушествуеть!!!');
  res.status(204).send(customer);
}
exports.deleteCustomer = async (id,res) => {
  const customer = await Customer.findByIdAndRemove(id);
  if (!customer)
    return res.status(404).send('такой обект не сушествуеть!!!');
  res.status(204).send(customer);
}





