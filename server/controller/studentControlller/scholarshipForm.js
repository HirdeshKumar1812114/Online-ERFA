const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const multer = require("multer");
const path = require("path");
const posterPath = "public/uploadScholarshipForm";
const fs = require("fs");
const maxSize = 2 * 1024 * 1024; // for 1MB

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
  // console.log('uploadFile=>',uploadFilePath);
console.log(req.body.student)
console.log(req.body.scholarship)

 checkTitle=req.body.student
  if (checkTitle) {
    let newForm = new db.ScholarshipForm({
      student: req.body.student,
      scholarship:req.body.scholarship,
      form: req.file.filename,
     
    });

    await newForm.save((err, checkTitle) => {
      if (err) return res.json({ Error: err });
      return res.json(newForm);
    });
  } else {
    fs.promises.unlink(uploadFilePath + "/" + req.file.filename);
    return res.json({ message: "alreadExisted" });
  }
});

   
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
    const id = req.params.id;
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
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipForm.findOneAndUpdate(
        { _id: fetchDetails.id },
        {
          student: req.body.student,
          scholarship:req.body.scholarship,
          form: req.file.filename,
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
          .json({ message: "Trouble in saving changes in details" });
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
          student: req.body.student,
          scholarship:req.body.scholarship,
          
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
