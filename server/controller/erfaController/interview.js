const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var nodemailer = require('nodemailer');

exports.schedule=expressAsyncHandler(async(req, res, next)=>{
try{

  const addNewRecord=new db.Interview({

    startDate:req.body.startDate,
    endDate:req.body.endDate,
    startTime:req.body.startTime,
    endTime:req.body.endTime,
    venue: req.body.venue,

  })
  
  const checkRecord=await addNewRecord.save();

  if(checkRecord){
res.status(200).send({message:'Interview Scheduled!',checkRecord:checkRecord});
  }
  else{
      res.status(400).send({message:'Error in saving the data '})
  }
res.end();
}catch(error){
    res.status(500).send({message: error.message});
}
})

exports.getInterviewDetail=expressAsyncHandler(async(req,res,next)=>{
 try{
    const getInterviewId=req.params.id;
    const findRecord= await db.Interview.findOne({_id:getInterviewId})

    if(findRecord){
res.status(200).send(findRecord)

    }else{
        res.status(400).send({message:'Error in saving'})

    }

    res.end();
 }
 catch(error){
    res.status(500).send({message: error.message});
 }
})
exports.getAllInterviewDetails= expressAsyncHandler(async (req, res,next) => {
  try {
    const findAllInterview = await db.Interview.find({
    });
    if (findAllInterview) {
      res.status(200).send(findAllInterview);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).send("Error in delete catch block");
  }

  }
)

exports.reSchedule = expressAsyncHandler(async(req, res, next)=>{

try{
const updateInterviewDetails = await db.Interview.findByIdAndUpdate(
  req.params.id,
  { $set: req.body }
)

if(updateInterviewDetails){
  res.status(200).send({message:'Update!'})
}else{
res.status(400).send({message:'Not Update!'})
}
}
catch(error){
  res.status(500).send("Error in delete catch block");
}

})


exports.removeSchdule= expressAsyncHandler(async(req, res, next)=>{
try{
await db.Interview.findByIdAndDelete(req.params.id);
res.status(200).send({message:'Successfully Delete!'})
res.end();
}
catch(error){
res.status(500).send({message:'Error in catch block'})
}
})

exports.selectStudents=expressAsyncHandler(async(req,res)=>{
const students = req.body.students

console.log( students )
for(let i=0; i<students.length; i++){

  var findDocs=await  db.ScholarshipForm.findOneAndUpdate({_id:students[i]},  { $set: {interview:req.body.interview} });
if(findDocs){
  console.log("Done attacted interview with applications");
}else{
console.log("No documents found")
}}


res.redirect(307, "/interview/sendinterviewemail")
})

exports.sendEmailInterview= expressAsyncHandler(async(req, res)=>{

var students=req.body.students;
for (let i=0; i<students.length; i++)
{  var findStudent = await db.ScholarshipForm.aggregate([
    {
      $match: { _id: ObjectId(students[i]) }
    },    
    {$lookup:{
      from:'userstudents',
      localField:"student",
      foreignField:"_id",
      as:"studentdetails"
    }},{$unwind:"$studentdetails"},
    
    {$lookup:{
      from:'interviews',
      localField:"interview",
      foreignField:"_id",
      as:"interviewdetails"
    }},{$unwind:"$interviewdetails"},
    {
      $project:{
        "_id":1,
        "student":1,
       "scholarship":1,
       "form":1, 
       "status":1,
       "messageStudent":1,
       "messageOfficer":1,
       "interview":1,
       "studentdetails.regid":1,
       "studentdetails.firstname":1,
       "studentdetails.lastname":1,
     "studentdetails.email":1,        
       "studentdetails.section":1,
       "interviewdetails.startDate":1,
       "interviewdetails.startDate": 1,
       "interviewdetails.endDate": 1,
       "interviewdetails.startTime": 1,
       "interviewdetails.endTime": 1,
       "interviewdetails.venue": 1,

      }  
    }
 
  ]);

  var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlineerfa1998@gmail.com',
    pass: 'ciuptmjpjlnzgfgo'
  }
});

var mailOptions = {
  from: 'onlineerfa1998@gmail.com',
  to: `${findStudent[0].studentdetails.email}`,
  subject: 'Interview Details',
  html: `<h1>Interview details</h1><p>${findStudent[0].studentdetails.email}</p><p>startDate:${findStudent[0].interviewdetails.startDate}</p>endDate:${findStudent[0].interviewdetails.endDate}<p>startTime:${findStudent[0].interviewdetails.startTime}</p><p>endTime:${findStudent[0].interviewdetails.endTime}</p> <p>venue:${findStudent[0].interviewdetails.venue}</p>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

  console.log(findStudent[0].studentdetails.email)
  
}


//   for(let i=0; i<students.length; i++){
// }
  res.end();
})