const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadScholarshipPoster");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.uploadImg = multer({ storage: storage }).single("image");
exports.addScholarshipPost = expressAsyncHandler(async (req, res, next) => {
  const checkTitle = await db.ScholarshipPost.findOne({
    title: req.body.title,
  });

  if (checkTitle === null) {
    const newPost = new db.ScholarshipPost({
      title: req.body.title,
      description: req.body.description,
      applicationstart: req.body.applicationstart,
      applicationdeadline: req.body.applicationdeadline,
      poster: req.file.path,
      eligibility: req.body.eligibility,
      tags: req.body.tags,
    });
    try {
      const newSp = await newPost.save();
      if (newSp) {
        res.status(201).send(newSp);
        res.end();
      } else {
        res
          .status(400)
          .json({ message: "Error in making new Scholarship Post" });
      }
    } catch (err) {
      res.status(400).json({ message: "Error in catch block" });
    }
  } else {
    res.status(200).json({ message: "Scholarship already exists" });
    res.end();
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

exports.deleteScholarship = expressAsyncHandler(async (req, res, next) => {
  try {
    await db.ScholarshipPost.findByIdAndRemove(req.params.id);
    res.json({ message: "Deleted Scholarship Post" });
    res.end();
  } catch {
    res.status(400).json({ message: "Not able to delete a record " });
  }
});

exports.updateScholarship = expressAsyncHandler(async (req, res, next) => {
  try {
    const update = await db.ScholarshipPost.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        applicationstart: req.body.applicationstart,
        applicationdeadline: req.body.applicationdeadline,
        poster: req.file.path,
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
