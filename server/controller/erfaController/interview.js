const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var nodemailer = require('nodemailer');

exports.schedule = expressAsyncHandler(async (req, res, next) => {
  try {

    const addNewRecord = new db.Interview({

      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      venue: req.body.venue,
      scholarship: req.body.scholarship,

    })

    const checkRecord = await addNewRecord.save();

    if (checkRecord) {
      res.status(200).send({ message: 'Interview Scheduled!', checkRecord: checkRecord });
    }
    else {
      res.status(400).send({ message: 'Error in saving the data ' })
    }
    res.end();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

exports.getInterviewDetail = expressAsyncHandler(async (req, res, next) => {
  try {
    const getInterviewId = req.params.id;
    const findRecord = await db.Interview.findOne({ _id: getInterviewId })

    if (findRecord) {
      res.status(200).send(findRecord)

    } else {
      res.status(400).send({ message: 'Error in saving' })

    }

    res.end();
  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
})
exports.getAllInterviewDetails = expressAsyncHandler(async (req, res, next) => {
  try {
    const findAllInterview = await db.Interview.aggregate([{
      $lookup:{
          from:'scholarshipposts',
          localField:"scholarship",
          foreignField:"_id",
          as:"scholarshipdetails"
      },
    
  },{$unwind:"$scholarshipdetails"},
  {
    $project:{
      "_id": 1,
      "startDate": 1,
      "endDate": 1,
      "startTime": 1,
      "endTime": 1,
      "venue": 1,
      "scholarship":1,
        "scholarshipdetails.title":1,
        "scholarshipdetails.applicationstart":1,
        "scholarshipdetails.applicationdeadline":1,
        "studentdetails.regid":1,
        "studentdetails.firstname":1,
        "studentdetails.lastname":1,
        "studentdetails.section":1,
        "studentdetails.email":1            
    }}])
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

exports.reSchedule = expressAsyncHandler(async (req, res, next) => {

  try {
    const updateInterviewDetails = await db.Interview.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
    )

    if (updateInterviewDetails) {
      res.status(200).send({ message: 'Update!' })
    } else {
      res.status(400).send({ message: 'Not Update!' })
    }
  }
  catch (error) {
    res.status(500).send("Error in delete catch block");
  }

})


exports.removeSchdule = expressAsyncHandler(async (req, res, next) => {
  try {
    await db.Interview.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Successfully Delete!' })
    res.end();
  }
  catch (error) {
    res.status(500).send({ message: 'Error in catch block' })
  }
})

exports.selectStudents = expressAsyncHandler(async (req, res) => {
  const students = req.body.students

  console.log(students)
  for (let i = 0; i < students.length; i++) {

    var findDocs = await db.ScholarshipForm.findOneAndUpdate({ _id: students[i] }, { $set: { interview: req.body.interview,emailSented:'Yes' } });
    if (findDocs) {
      console.log("Done attacted interview with applications");
    } else {
      console.log("No documents found")
    }
  }


  res.redirect(307, "/interview/sendinterviewemail")
})

exports.sendEmailInterview = expressAsyncHandler(async (req, res) => {

  var students = req.body.students;
  for (let i = 0; i < students.length; i++) {
    var findStudent = await db.ScholarshipForm.aggregate([
      {
        $match: { _id: ObjectId(students[i]) }
      },
      {
        $lookup: {
          from: 'userstudents',
          localField: "student",
          foreignField: "_id",
          as: "studentdetails"
        }
      }, { $unwind: "$studentdetails" },

      {
        $lookup: {
          from: 'interviews',
          localField: "interview",
          foreignField: "_id",
          as: "interviewdetails"
        }
      }, { $unwind: "$interviewdetails" },
      {
        $project: {
          "_id": 1,
          "student": 1,
          "scholarship": 1,
          "form": 1,
          "status": 1,
          "messageStudent": 1,
          "messageOfficer": 1,
          "interview": 1,
          "studentdetails.regid": 1,
          "studentdetails.firstname": 1,
          "studentdetails.lastname": 1,
          "studentdetails.email": 1,
          "studentdetails.section": 1,
          "interviewdetails.startDate": 1,
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
      subject: `Interview Details ${findStudent[0].studentdetails.regid}`,
      html: `<p><strong>Hello ${findStudent[0].studentdetails.firstname},</strong></p>
  <p>&nbsp;</p>
  <p>Your interview is scheduled on ${findStudent[0].interviewdetails.startTime} ${findStudent[0].interviewdetails.startDate} at ${findStudent[0].interviewdetails.venue}. Please be on time.</p>
  <p>&nbsp;</p>
  <p>King Regards,</p>
  <p>EERFA Department</p>
  <p>&nbsp;</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
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



exports.sendPanelistEmail= expressAsyncHandler(async (req, res)=>{
  try {
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const startTime=req.body.startTime;
    const endTime=req.body.endTime;
    const date=req.body.date;
    const venue=req.body.venue;
    const panelistId=req.body.panelistId;
    const scholarshipTitle=req.body.scholarshipTitle;
    console.log(firstname);
    console.log(lastname);
    console.log(startTime);
    console.log(endTime);
    console.log(venue);
    console.log(date);
    console.log(panelistId);
    console.log(scholarshipTitle);

    const officer = await db.ErfaOfficer.findOne({ $and:[{firstname:firstname, lastname:lastname}] });
    if (officer) {
    

      
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
      to: `${officer.email}`,
      subject: `Invite to ${firstname} ${lastname}`,
      html: `<p><strong>Hello ${firstname},</strong></p>
  <p>&nbsp;</p>
  <p>We are delighted to invite you as a interview panelist to evaluate students that shorlisted for ${scholarshipTitle} by the ERFA Department.</p>
  <p>Kindly, please be availble on ${date} from ${startTime} till ${endTime} at ${venue}.</p>.
  <p>&nbsp;</p>
  <p>King Regards,</p>
  <p>EERFA Department</p>
  <p>&nbsp;</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    const addNewRecord =new db.InterviewPanelist({

      date: date,
      startTime: startTime,
      endTime: endTime,
      venue: venue,
      scholarshipTitle: scholarshipTitle,
      panelistId: ObjectId(panelistId),

    })

    const checkRecord = await addNewRecord.save();
    if(checkRecord){
    res.status(200).send({message: 'Email sent successfully'});
      res.end();}
      else{
        res.status(400).send({message: 'Email not sent successfully'});
      }
    } else {
      res.status(400).json({ message: "User First Name and Last Name are not matching" });
    }
  } catch (err) {
    res.status(400).send("catch block");
  }
})

exports.fetchStudentRecordsOnStudent= expressAsyncHandler(async (req, res)=>{

  try{
const studentId=req.body.studentId;
const scholarshipTitle=req.body.scholarshipTitle;
const fetchStudentId= await db.UserStudent.findOne({regid:studentId});
const fetchScholarshipTitle=await db.ScholarshipPost.findOne({title:scholarshipTitle});

const spstudentId=fetchStudentId._id;
const spscholarshipTitle=fetchScholarshipTitle._id;
const fetchStudentApplication=await db.ScholarshipForm.findOne({$and:[{student:spstudentId},{scholarship:spscholarshipTitle}]});
// console.log(spstudentId);
// console.log(spscholarshipTitle);

if(fetchStudentId &&  fetchScholarshipTitle && fetchStudentApplication){
 

  res.status(200).send({studentdetails:fetchStudentId,scholarshipdetails:fetchScholarshipTitle,scholarship:fetchStudentApplication})
  res.end()
}else
{
  res.status(400).send({message: 'Not Found'})
  res.end()
}
} catch (err) {
    res.status(400).send({message:'Not Found'});
    res.end()
  }
})

exports.evaluateStudent= expressAsyncHandler(async (req, res)=>{
 const chk1=  ObjectId(req.body.panelist);
 const chk2=  ObjectId(req.body.application);
  try{
const checkRecord= await db.EvaluationScholarshipApplications.findOne({$and:[ {application:chk2},{        panelist:chk1}]})
console.log(checkRecord)   
if(checkRecord){


      res.status(400).send({message:'Interview panelist has evaluated this candiate.'})
      res.end()
   }

    else{
      const addNewRecord = new db.EvaluationScholarshipApplications ({

        score:req.body.score,
        remark:req.body.remark,
        application:ObjectId(req.body.application),
        panelist:ObjectId(req.body.panelist),
  
      })
  
      const checkRecord = await addNewRecord.save();
  
      if (checkRecord) {
        res.status(200).send({ message: 'Student Evaluated!', checkRecord: checkRecord });
      }
      else {
        res.status(400).send({ message: 'Error in saving the data ' })
      }
      res.end();
    }
  }catch(err){
    res.status(500).send({ message: err.message });
  }
})

exports.getAllRemarkonApplication = expressAsyncHandler(async (req, res, next) => {
  try {
    const app =  ObjectId(req.body.application);
    // const fetch = await db.EvaluationScholarshipApplications.find({application:app});

    const fetch = await db.EvaluationScholarshipApplications.aggregate([{
      $match: {application:{ $eq: ObjectId(app)}}
    },{
      $lookup:{
          from:'erfaofficers',
          localField:"panelist",
          foreignField:"_id",
          as:"erfadetails"
      },
    
  },{$unwind:"$erfadetails"},
  {
    $project:{
      "_id": 1,
      "score": 1,
      "remark": 1,
   "application":1,
        "erfadetails.firstname":1,
        "erfadetails.lastname":1,
        "erfadetails.designation":1,
        "erfadetails.email":1
              
    }}])
  if(fetch){
    res.status(200).send(fetch);
    res.end();
  }else{
    res.status(404).json({ message: "Not Found" });
  }
  } catch {
    res.status(500).json({ message: "Catch error" });
  }
});


exports.getAllInterviewPanelistDetails = expressAsyncHandler(async (req, res, next) => {
  try {
    const officer = await db.InterviewPanelist.find();
    if (officer) {
      res.status(200).send(officer);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});
