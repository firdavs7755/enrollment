const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')

const mongoose = require('mongoose');
const courseC = require('./controllers/course')
const customerC = require('./controllers/customer')
const enrollmentC = require('./controllers/enrollemnts')
const userC = require('./controllers/users')
const app = express();
app.use(morgan('tiny'));
mongoose.connect('mongodb://localhost/enrollment', {useNewUrlParser:true,useCreateIndex: true ,useFindAndModify:false,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to db ...")
}).catch(e=>{
    console.log('Noooo ',e)
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/kurs',courseC);
app.use('/cust',customerC);
app.use('/enroll',enrollmentC);
app.use('/user',userC);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('5000 port is listening.....')
})