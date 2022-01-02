const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const multer = require("multer");
const path = require("path");
var get;

const uploadFilePath = path.resolve(
  __dirname,
  "../..",
  "public/uploadScholarshipPoster"
);

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

exports.addScholarshipPost = (req, res, next) => {
  db.ScholarshipPost.findOne(
    {
      title: req.body.title,
    },
    (checkTitle) => {
      console.log(checkTitle);
      if (checkTitle == null) {
        let newPost = new db.ScholarshipPost({
          title: req.body.title,
          description: req.body.description,
          applicationstart: req.body.applicationstart,
          applicationdeadline: req.body.applicationdeadline,
          poster: req.file.filename,
          eligibility: req.body.eligibility,
          tags: req.body.tags,
        });

        newPost.save((err, checkTitle) => {
          if (err) return res.json({ Error: err });
          return res.json(newPost);
        });
      } else {
        return res.json({ message: "Scholarship title already exists" });
      }
    }
  );
};

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
