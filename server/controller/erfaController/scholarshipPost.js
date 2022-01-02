const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const multer = require("multer");
const path = require("path");
const posterPath = "public/uploadScholarshipPoster";
const fs = require("fs");

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

exports.uploadImage = multer({
  storage: storage,
}).single("poster");

exports.addScholarshipPost = expressAsyncHandler(async (req, res, next) => {
  console.log(uploadFilePath);
  let checkTitle = await db.ScholarshipPost.findOne({ title: req.body.title });
  if (checkTitle === null) {
    let newPost = new db.ScholarshipPost({
      title: req.body.title,
      description: req.body.description,
      applicationstart: req.body.applicationstart,
      applicationdeadline: req.body.applicationdeadline,
      poster: req.file.filename,
      eligibility: req.body.eligibility,
      tags: req.body.tags,
    });

    await newPost.save((err, checkTitle) => {
      if (err) return res.json({ Error: err });
      return res.json(newPost);
    });
  } else {
    return res.json({ message: "Scholarship title already exists" });
  }
});

exports.getAllScholarship = expressAsyncHandler(async (req, res, next) => {
  try {
    const fetch = await db.ScholarshipPost.find();
    res.status(200).send(fetch);
    res.end();
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
});

exports.getScholarship = expressAsyncHandler(async (req, res, next) => {
  try {
    const fetch = await db.ScholarshipPost.findOne({ _id: req.params.id });
    res.status(200).send(fetch);
    res.end();
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
});

exports.deleteScholarship = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const prev = await db.ScholarshipPost.findOne({ _id: id });
      await fs.promises.unlink(uploadFilePath + "\\" + prev.poster);
      const result = await db.ScholarshipPost.deleteOne({ _id: id });
      console.log("saved to Mongo>>", result);
      res.status(201).json({ message: "Deleted Successfully" }).end();
    } else {
      res.status(500).json({ message: "Failed id required" }).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed" }).end();
  }
};

exports.updateScholarship = expressAsyncHandler(async (req, res, next) => {
  try {
    const update = await db.ScholarshipPost.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        applicationstart: req.body.applicationstart,
        applicationdeadline: req.body.applicationdeadline,
        poster: req.body.poster,
        eligibility: req.body.eligibility,
        tags: req.body.tags,
      },
    });

    if (update) {
      const checkUpdate = await update.save();
      res
        .status(200)
        .send({ message: "Scholarship Details edited successfully." });
      res.end();
    } else {
      res.status(400).json({ message: "Error in saving the update" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error in updating" });
  }
});
