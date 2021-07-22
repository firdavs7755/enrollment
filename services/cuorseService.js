const {Course,validationCourse} = require('../models/course');


exports.getCourses = async (req,res)=> {
  const courses = await Course.find();
  res.status(200).send(courses);
}
exports.getCourseById = async (id,res)=>{
  const course = await Course.findById(id)
  if (!course)
    return res.status(404).send('такой курс не сушествует!!!')
  res.status(200).send(course);
}
exports.addCourse = async (reqBody,res)=>{
  const {error} = validationCourse(reqBody);
  if (error){
    return res.status(404).send(error.details[0].message);
  }
  let course = new Course({
    title:reqBody.title
  })
  try{
    course = await course.save();
    res.status(201).send(course);
  }catch (e) {
    console.log(e);
  }
};
exports.updateCourse = async (id,reqBody,res) => {
  const {error} = validationCourse(reqBody);
  if (error)
    return res.status(400).send(error.details[0].message)
  let course = await Course.findByIdAndUpdate(id,{
    title:reqBody.title
  });
  if (!course)
    return res.status(404).send('Такой обект не сушествует!!!');
  res.status(204).send(course);
}
exports.deleteCourse = async (id,res) => {
  const course = await Course.findByIdAndRemove(id);
  if (!course)
    return res.status(404).send('такой курс не сушествует!!!');
  res.status(204).send(course);
}
// exports.getCourses = getCourses;