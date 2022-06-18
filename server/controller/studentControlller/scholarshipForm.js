const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const multer = require("multer");
const path = require("path");
const posterPath = "public/uploadScholarshipForm";
const fs = require("fs");
const maxSize = 10 * 1024 * 1024; // for 10MB
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const uploadFilePath = path.resolve(__dirname, "../..", posterPath);

const storage = multer.diskStorage({
  destination: uploadFilePath,
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },

});

const upload = multer({
  storage: (storage, cb) => {
    cb(null, storage);

    console.log(storage.originalname);
  },
});

exports.uploadForm = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(path.extname(file.originalname)); // extract the file extension
    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, give an error of compatibilty
    return cb("Only pdF are allow!");
  }
}).single("form");

exports.addScholarshipForm = expressAsyncHandler(async (req, res, next) => {
  const { scholarship, student } = req.body

  const checkRecord = await db.ScholarshipForm.findOne({ student: student, scholarship: scholarship })
  console.log(checkRecord)
  if (!checkRecord) {
    let newForm = new db.ScholarshipForm({
      student: req.body.student,
      scholarship: req.body.scholarship,
      status: req.body.status,
      messageStudent: req.body.messageStudent,
      messageOfficer: req.body.messageOfficer,
      applicationComplete: req.body.applicationComplete,
      emailSented: 'No',
      acceptedForScholarship: false
    });

    await newForm.save((err, checkTitle) => {
      if (err) return res.json({ Error: err });
      return res.json(newForm);
    });
  } else {

    return res.json({ message: "already existed!" });
  }
}





);


exports.getAllScholarshipForm = expressAsyncHandler(async (req, res, next) => {
  try {
    const fetch = await db.ScholarshipForm.aggregate([
      {
        $match: {
          form: { $exists: true },
        }
      }, {
        $lookup: {
          from: 'scholarshipposts',
          localField: "scholarship",
          foreignField: "_id",
          as: "scholarshipdetails"
        },

      }, { $unwind: "$scholarshipdetails" },
      {
        $lookup: {
          from: 'userstudents',
          localField: "student",
          foreignField: "_id",
          as: "studentdetails"
        }
      }, { $unwind: "$studentdetails" }, {
        $project: {
          "_id": 1,
          "student": 1,
          "scholarship": 1,
          "form": 1,
          "status": 1,
          "messageStudent": 1,
          "messageOfficer": 1,

          "scholarshipdetails.title": 1,
          "scholarshipdetails.applicationstart": 1,
          "scholarshipdetails.applicationdeadline": 1,
          "studentdetails.regid": 1,
          "studentdetails.firstname": 1,
          "studentdetails.lastname": 1,
          "studentdetails.section": 1,
          "studentsdetails.email": 1
        }
      }
    ]);
    res.status(200).send(fetch);
    res.end();
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
});

exports.getScholarshipForm = expressAsyncHandler(async (req, res, next) => {
  try {
    const fetch = await db.ScholarshipForm.findOne({ _id: req.params.id });
    res.status(200).send(fetch);
    res.end();
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
});

exports.deleteScholarshipForm = async (req, res) => {
  try {

    if (id) {
      const prev = await db.ScholarshipForm.findOne({ _id: id });
      console.log(prev.form)
      await fs.promises.unlink(uploadFilePath + "/" + prev.form);
      const result = await db.ScholarshipForm.deleteOne({ _id: id });
      // console.log("Saved to Database>>", result);
      res.status(201).json({ message: "Deleted Successfully" }).end();
    } else {
      res.status(500).json({ message: "Failed id required" }).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed" }).end();
  }
};



exports.updateScholarshipForm = async (req, res) => {

  const chk = req.file;
  if (chk) {
    const fetchDetails = await db.ScholarshipForm.findOne({
      _id: req.params.id,
    });
    const fetchDetails2 = await db.ScholarshipForm.findOne({ __id: fetchDetails.id, form: { $exists: true } })
    console.log(fetchDetails2)
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipForm.findOneAndUpdate(
        { _id: fetchDetails.id },
        {

          form: req.file.filename,

          messageStudent: req.body.messageStudent,
          status: 'submitted'

        }
      );
      if (fetchDetails.form !== undefined) {

        await fs.promises.unlink(uploadFilePath + "/" + fetchDetails.form);
        res.status(201).json({ message: "Updated Successfully Details and Form" })
        res.end();
      } else {
        console.log("This value" + fetchDetails.form);

        res.status(201).json({ message: "Updated Successfully Details and Form" })
        res.end();
      }
    } else {
      await fs.promises.unlink(uploadFilePath + "/" + req.file.filename);
      res.status(500).json({ message: "Error in finding" });
      res.end();
    }
  } else {
    const fetchDetails = await db.ScholarshipForm.findOne({
      _id: req.params.id,
    });
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipForm.findOneAndUpdate(
        { _id: fetchDetails.id },
        {

          messageStudent: req.body.messageStudent,
          status: 'submitted'


        }
      );
      if (updateDetails) {
        // console.log(uploadFilePath + "/" + fetchDetails.poster);

        res.status(201).json({ message: "Updated Details Successfully" })
        res.end();
      } else {
        res
          .status(400)
          .json({ message: "Trouble in saving changes in details" });
        res.end();
      }
    } else {
      res.status(500).json({ message: "Error in finding" });
      res.end();
    }
  }
};

exports.updateMessageStudent = expressAsyncHandler(async (req, res, next) => {
  const getId = req.params.id;
  try {
    console.log(getId)
    const getMessageStudent = await db.ScholarshipForm.findByIdAndUpdate({ _id: getId }, {
      messageStudent: req.body.messageStudent
    })
    if (getMessageStudent) {
      console.log(getMessageStudent)
      res.status(200).send({ message: "Student sent message success!" })
      res.end()
    }
    else {
      res.status(400).send({ message: "No message from Student." })
      res.end()
    }

  }
  catch (error) {
    res.status(500).json({ message: "Error in finding" })
  }
})


exports.updateOfficer = expressAsyncHandler(async (req, res, next) => {
  const getId = req.params.id;
  try {
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({ _id: getId }, {
      messageOfficer: req.body.messageOfficer,
      status: req.body.status


    })
    if (getMessageOfficer) {
      console.log(getMessageOfficer)
      res.status(200).send({ message: "Officer sent message success!" })
      res.end()
    }
    else {
      res.status(400).send({ message: "No message from Student." })
      res.end()
    }

  }
  catch (error) {
    res.status(500).json({ message: "Error in finding" })
  }
})





exports.updateApplicationComplete = expressAsyncHandler(async (req, res, next) => {
  const getId = req.params.id;
  try {
    hng
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({ _id: getId }, {
      applicationComplete: req.body.applicationComplete
    })
    if (getMessageOfficer) {
      console.log(getMessageOfficer)
      res.status(200).send({ message: "Application State Changed" })
      res.end()
    }
    else {
      res.status(400).send({ message: "No change were made!" })
      res.end()
    }

  }
  catch (error) {
    res.status(500).json({ message: "Error in finding" })
  }
})


exports.updateStatus = expressAsyncHandler(async (req, res, next) => {
  const getId = req.params.id;
  try {
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({ _id: getId }, {
      status: req.body.status
    })
    if (getMessageOfficer) {
      console.log(getMessageOfficer)
      res.status(200).send({ message: "Update State Changed" })
      res.end()
    }
    else {
      res.status(400).send({ message: "No change were made!" })
      res.end()
    }

  }
  catch (error) {
    res.status(500).json({ message: "Error in finding" })
  }
})

exports.fetchStudentScholarshipForm = expressAsyncHandler(async (req, res, next) => {

  const scholarship = req.body.scholarship;
  const student = req.body.student;
  console.log(student);
  console.log(scholarship);
  try {
    const fetchApplication = await db.ScholarshipForm.findOne({ scholarship: scholarship, student: student });
    const interviewDetails = await db.ScholarshipForm.aggregate([
      {
        $match: {
          form: { $exists: true },
          scholarship: { $eq: ObjectId(scholarship) },
          student: { $eq: ObjectId(student) }


        }
      },
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

          "interview": 1,
          "interviewdetails.startDate": 1,
          "interviewdetails.startDate": 1,
          "interviewdetails.endDate": 1,
          "interviewdetails.startTime": 1,
          "interviewdetails.endTime": 1,
          "interviewdetails.venue": 1,

        }
      }

    ]);

    if (fetchApplication) {
      console.log(interviewDetails)
      res.status(200).send(fetchApplication);
      res.end();

    } else {

      res.status(404).send({ message: "Not Found!" })
      res.end();
    }
  }
  catch (error) {
    res.status(500).send({ message: error.message })
    res.end();
  }
})

exports.fetchInterviewStudentScholarshipForm = expressAsyncHandler(async (req, res, next) => {

  const scholarship = req.body.scholarship;
  const student = req.body.student;
  console.log(student);
  console.log(scholarship);
  try {

    const interviewDetails = await db.ScholarshipForm.aggregate([
      {
        $match: {
          form: { $exists: true },
          scholarship: { $eq: ObjectId(scholarship) },
          student: { $eq: ObjectId(student) }


        }
      },
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
          "interviewdetails.startDate": 1,
          "interviewdetails.startDate": 1,
          "interviewdetails.endDate": 1,
          "interviewdetails.startTime": 1,
          "interviewdetails.endTime": 1,
          "interviewdetails.venue": 1,

        }
      }

    ]);

    if (interviewDetails) {

      res.status(200).send(interviewDetails);
      res.end();

    } else {

      res.status(404).send({ message: "Not Found!" })
      res.end();
    }
  }
  catch (error) {
    res.status(500).send({ message: error.message })
    res.end();
  }
})

exports.sortStatus = expressAsyncHandler(async (req, res) => {
  checkStatus = req.body.status;
  checkTitle = req.body.title;
  console.log(checkStatus)
  console.log(checkTitle)
  try {
    const fetch = await db.ScholarshipForm.aggregate([
      {
        $match: {
          form: { $exists: true },
          status: checkStatus

        }
      }, {
        $lookup: {
          from: 'scholarshipposts',
          localField: "scholarship",
          foreignField: "_id",
          as: "scholarshipdetails"
        },

      }, { $unwind: "$scholarshipdetails" },
      {
        $lookup: {
          from: 'userstudents',
          localField: "student",
          foreignField: "_id",
          as: "studentdetails"
        }
      }, { $unwind: "$studentdetails" }, {
        $project: {
          "_id": 1,
          "student": 1,
          "scholarship": 1,
          "form": 1,
          "status": 1,
          "messageStudent": 1,
          "messageOfficer": 1,

          "scholarshipdetails.title": 1,
          "scholarshipdetails.applicationstart": 1,
          "scholarshipdetails.applicationdeadline": 1,
          "studentdetails.regid": 1,
          "studentdetails.firstname": 1,
          "studentdetails.lastname": 1,
          "studentdetails.section": 1,
          "studentdetails.email": 1
        }
      }
    ]);

    res.status(200).send(fetch);
    res.end();
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
})

exports.sortStatusandTitle = expressAsyncHandler(async (req, res) => {

  const scholarship = req.body.scholarship;
  const status = req.body.status;
  console.log(status);
  console.log(scholarship);
  try {

    const fetchApplication = await db.ScholarshipForm.aggregate([

      {
        $match: {
          form: { $exists: true },
          status: {
            $eq:
              status
          },
          scholarship: { $eq: ObjectId(scholarship) }
        }
      }, {
        $lookup: {
          from: 'userstudents',
          localField: "student",
          foreignField: "_id",
          as: "studentdetails"
        }
      }, { $unwind: "$studentdetails" }, {
        $project: {
          "_id": 1,
          "student": 1,
          "scholarship": 1,
          "form": 1,
          "status": 1,
          "messageStudent": 1,
          "messageOfficer": 1,
          "interview": 1,
          "emailSented": 1,
          "acceptedForScholarship":1,
          "scholarshipdetails.title": 1,
          "scholarshipdetails.applicationstart": 1,
          "scholarshipdetails.applicationdeadline": 1,
          "studentdetails.regid": 1,
          "studentdetails.firstname": 1,
          "studentdetails.lastname": 1,
          "studentdetails.section": 1,
          "studentdetails.email": 1,
        }
      }])

    if (fetchApplication) {
      res.status(200).send(fetchApplication)
      res.end();
    } else {

      res.status(400).send({ message: 'Applications not found' })
      res.end();

    }
  }
  catch (error) {
    res.status(500).send({ message: error.message })
    res.end();
  }
})

exports.allocateScholarship = expressAsyncHandler(async function (req, res, next) {

  const getApplicationId = req.body.applicationId;
  const scholarshipPercentage = req.body.scholarshipPercentage;
  const acceptedForScholarship = req.body.acceptedForScholarship;
  const studentId = req.body.studentId;
  const scholarshipTitle = req.body.scholarshipTitle
  // console.log(getApplicationId);
  // console.log(acceptedForScholarship);
  // console.log(scholarshipPerzzcentage);



  const saveChanges = await db.ScholarshipForm.findByIdAndUpdate(getApplicationId, {
    $set: {
      scholarshipPercentage: scholarshipPercentage,
      acceptedForScholarship: acceptedForScholarship
    }
  })


  const getEmailAddress = await db.UserStudent.findOne({ _id: studentId })
  console.log(getEmailAddress.email)

  if (saveChanges) {


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
      to: `${getEmailAddress.email}`,
      subject: `${getEmailAddress.regid} ${scholarshipTitle} Final Decision`,
      html: `<p><strong>Hello ${getEmailAddress.firstname} ${getEmailAddress.lastname}</strong></p>
<p>&nbsp;</p>
<p>We are delighted to grant you ${scholarshipPercentage} scholarship under ${scholarshipTitle}.</p>
<p>This scholarship will be automatically adjusted for your next semester fees.</p>.
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

    res.status(200).json({ message: "Successfully in saving changes!" })
    res.end();
  } else {
    res.status(400).json({ message: "Unsuccessfully in saving changes!" })
    res.end();
  }






})

exports.fetchAllAcceptedByScholarshipId = expressAsyncHandler(async function (req, res) {
  try {

    const getScholarshipTitle = req.body.scholarshipTitle;

    const findScholarshipID = await db.ScholarshipPost.findOne({ title: getScholarshipTitle })

    if (findScholarshipID) {

      const getScholarshipId = findScholarshipID._id;

      const fetchApplications = await db.ScholarshipForm.aggregate([

        {
          $match: {
            interview: { $exists: true },
            scholarship: { $eq: ObjectId(getScholarshipId) }
          }
        }, {
          $lookup: {
            from: 'scholarshipposts',
            localField: "scholarship",
            foreignField: "_id",
            as: "scholarshipdetails"
          },

        }, { $unwind: "$scholarshipdetails" },
        {
          $lookup: {
            from: 'userstudents',
            localField: "student",
            foreignField: "_id",
            as: "studentdetails"
          }
        }, { $unwind: "$studentdetails" }, {
          $project: {
            "_id": 1,
            "student": 1,
            "scholarship": 1,
            "interview": 1,
            "scholarshipPercentage": 1,
            "acceptedForScholarship": 1,
            "status": 1,
            "scholarshipdetails.title": 1,
            "studentdetails.regid": 1,
            "studentdetails.firstname": 1,
            "studentdetails.lastname": 1,
            "studentdetails.section": 1,
            "studentdetails.email": 1
          }
        }])

      if (fetchApplications) {
        res.status(200).send(fetchApplications)
        res.end()
      } else {
        res.status(400).send({ message: 'No canidate approved this scholarship' })
        res.end()
      }

    } else {
      res.status(400).send({ message: 'Unable to locate scholarship of this title' })
      res.end()
    }
  }
  catch (error) {
    res.status(500).send({ message: "Error in catch" })
  }

})



















exports.fetchAllAcceptedByRegId = expressAsyncHandler(async function (req, res) {
  try {

    const getRegId = req.body.regid;

    const findStudentID = await db.UserStudent.findOne({ regid: getRegId })

    if (findStudentID) {

      const getfindStudentID = findStudentID._id;

      const fetchApplications = await db.ScholarshipForm.aggregate([

        {
          $match: {
            acceptedForScholarship: { $exists: true },
            student: { $eq: ObjectId(getfindStudentID) }
          }
        }, {
          $lookup: {
            from: 'scholarshipposts',
            localField: "scholarship",
            foreignField: "_id",
            as: "scholarshipdetails"
          },

        }, { $unwind: "$scholarshipdetails" },
        {
          $lookup: {
            from: 'userstudents',
            localField: "student",
            foreignField: "_id",
            as: "studentdetails"
          }
        }, { $unwind: "$studentdetails" }, {
          $project: {
            "_id": 1,
            "student": 1,
            "scholarship": 1,

            "scholarshipPercentage": 1,
            "acceptedForScholarship": 1,
            "status": 1,
            "scholarshipdetails.title": 1,
            "studentdetails.regid": 1,
            "studentdetails.firstname": 1,
            "studentdetails.lastname": 1,
            "studentdetails.section": 1,
            "studentdetails.email": 1
          }
        }])

      if (fetchApplications) {
        res.status(200).send(fetchApplications)
        res.end()
      } else {
        res.status(400).send({ message: 'No canidate approved this scholarship' })
        res.end()
      }

    } else {
      res.status(400).send({ message: 'Unable to locate scholarship of this regid' })
      res.end()
    }
  }
  catch (error) {
    res.status(500).send({ message: "Error in catch" })
  }

})


exports.sendScholarshipAcceptanceEmail = expressAsyncHandler(async function (req, res) {

  var students = req.body.students;
  console.log(students)
  for (let i = 0; i < students.length; i++) {
    console.log(students[i])
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
        $lookup: {
          from: 'scholarshipposts',
          localField: "scholarship",
          foreignField: "_id",
          as: "scholarshipdetails"
        },

      }, { $unwind: "$scholarshipdetails" },
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
          "scholarshipPercentage": 1,
          "studentdetails.regid": 1,
          "studentdetails.firstname": 1,
          "studentdetails.lastname": 1,
          "studentdetails.email": 1,
          "studentdetails.section": 1,
          "scholarshipdetails.title": 1,
          "interviewdetails.startDate": 1,
          "interviewdetails.startDate": 1,
          "interviewdetails.endDate": 1,
          "interviewdetails.startTime": 1,
          "interviewdetails.endTime": 1,
          "interviewdetails.venue": 1,

        }
      }

    ]);

    console.log(findStudent[0])

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
      subject: `${findStudent[0].scholarshipdetails.title} Final Result of ${findStudent[0].studentdetails.regid}`,
      html: `<p><strong>Hello ${findStudent[0].studentdetails.firstname},</strong></p>
  <p>&nbsp;</p>
  <p>We are pleased to inform you that you have successfully been accepted for ${findStudent[0].scholarshipdetails.title}.</p>
  <p>As per the evaluation from interview panelist and ERFA, we please to grant you ${findStudent[0].scholarshipPercentage} of the scholarship.</p>
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
  res.status(200).send({ message: "Emails to accepted candiates" })
  res.end();
})


