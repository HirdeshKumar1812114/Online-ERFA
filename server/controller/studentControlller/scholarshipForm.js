const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const multer = require("multer");
const path = require("path");
const posterPath = "public/uploadScholarshipForm";
const fs = require("fs");
const maxSize = 10 * 1024 * 1024; // for 10MB

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
    if(mimetype && extname){
        return cb(null, true);
    }
    // if mimetype or extname false, give an error of compatibilty
    return cb("Only pdF are allow!");
}
}).single("form");

exports.addScholarshipForm = expressAsyncHandler(async (req, res, next) => {
const {scholarship,student} = req.body

const checkRecord = await db.ScholarshipForm.findOne({student: student,scholarship:scholarship})
console.log(checkRecord)
  if (!checkRecord) {
    let newForm = new db.ScholarshipForm({
      student: req.body.student,
      scholarship:req.body.scholarship,
      status: req.body.status,
      messageStudent: req.body.messageStudent,
      messageOfficer:req.body.messageOfficer,
      applicationComplete:req.body.applicationComplete
    });

    await newForm.save((err, checkTitle) => {
      if (err) return res.json({ Error: err });
      return res.json(newForm);
    });
  } else {
  
    return res.json({ message: "alreadExisted" });
  }
}





);

   
exports.getAllScholarshipForm = expressAsyncHandler(async (req, res, next) => {
  try {
    const fetch = await db.ScholarshipForm.find();
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
    console.log(fetchDetails)
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipForm.findOneAndUpdate(
        { _id: fetchDetails.id },
        {
        
          form: req.file.filename,
        
          messageStudent: req.body.messageStudent,
       
        }
      );
      if (updateDetails) {
        // console.log(uploadFilePath + "/" + fetchDetails.poster);
        await fs.promises.unlink(uploadFilePath + "/" + fetchDetails.form);
        res
          .status(201)
          .json({ message: "Updated Successfully Details and Form" })
          .end();
      } else {
        res
          .status(400)
          .json({ message: "Trouble in saving changes in details" })
          .end()
      }
    } else {
      await fs.promises.unlink(uploadFilePath + "/" + req.file.filename);
      res.status(500).json({ message: "Error in finding" });
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
       
          
        }
      );
      if (updateDetails) {
        // console.log(uploadFilePath + "/" + fetchDetails.poster);

        res.status(201).json({ message: "Updated Details Successfully" }).end();
      } else {
        res
          .status(400)
          .json({ message: "Trouble in saving changes in details" });
      }
    } else {
      res.status(500).json({ message: "Error in finding" });
    }
  }
};

exports.updateMessageStudent= expressAsyncHandler(async (req, res, next) => {
  const getId=req.params.id;
  try{
    console.log(getId)
    const getMessageStudent = await db.ScholarshipForm.findByIdAndUpdate({_id:getId},{
      messageStudent: req.body.messageStudent
    })
    if(getMessageStudent){
      console.log(getMessageStudent)
      res.status(200).send({message:"Student sent message success!"})
      res.end()
    }
    else{
      res.status(400).send({message: "No message from Student."})
      res.end()
    }

  }
  catch(error){
    res.status(500).json({ message: "Error in finding" })
  }
})


exports.updateMessageOfficer= expressAsyncHandler(async (req, res, next) => {
  const getId=req.params.id;
  try{
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({_id:getId},{
      messageOfficer:req.body.messageOfficer


    })
    if(getMessageOfficer){
      console.log(getMessageOfficer)
      res.status(200).send({message:"Officer sent message success!"})
      res.end()
    }
    else{
      res.status(400).send({message: "No message from Student."})
      res.end()
    }

  }
  catch(error){
    res.status(500).json({ message: "Error in finding" })
  }
})





exports.updateApplicationComplete= expressAsyncHandler(async (req, res, next) => {
  const getId=req.params.id;
  try{
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({_id:getId},{
      applicationComplete:req.body.applicationComplete
    })
    if(getMessageOfficer){
      console.log(getMessageOfficer)
      res.status(200).send({message:"Application State Changed"})
      res.end()
    }
    else{
      res.status(400).send({message: "No change were made!"})
      res.end()
    }

  }
  catch(error){
    res.status(500).json({ message: "Error in finding" })
  }
})


exports.updateStatus= expressAsyncHandler(async (req, res, next) => {
  const getId=req.params.id;
  try{
    console.log(getId)
    const getMessageOfficer = await db.ScholarshipForm.findByIdAndUpdate({_id:getId},{
      status:req.body.status
    })
    if(getMessageOfficer){
      console.log(getMessageOfficer)
      res.status(200).send({message:"Update State Changed"})
      res.end()
    }
    else{
      res.status(400).send({message: "No change were made!"})
      res.end()
    }

  }
  catch(error){
    res.status(500).json({ message: "Error in finding" })
  }
})

exports.fetchStudentScholarshipForm= expressAsyncHandler(async (req, res, next) => {

  const scholarship=req.body.scholarship;
  const student=req.body.student;
  console.log(student);
  console.log(scholarship);
  try{
const fetchApplication= await db.ScholarshipForm.findOne({scholarship:scholarship,student:student});
if(fetchApplication){
res.status(200).send(fetchApplication);
res.end();

} else{

  res.status(404).send({message:"Not Found!"})
  res.end();
} 
}
  catch(error){
res.status(500).send({message: error.message })
res.end();
  }
})