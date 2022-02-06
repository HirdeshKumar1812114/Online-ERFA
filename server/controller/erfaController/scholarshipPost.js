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
    // console.log(file.originalname);
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: (storage, cb) => {
    cb(null, storage);

    // console.log(storage.originalname);
  },
});

exports.uploadImage = multer({
  storage: storage,
}).single("poster");

exports.addScholarshipPost = expressAsyncHandler(async (req, res, next) => {
  // console.log('uploadFile=>',uploadFilePath);

  let checkTitle = await db.ScholarshipPost.findOne({ title: req.body.title });
  let tagsRemoveSpaces = req.body.tags.replace(/\s/g, "");
  let tags = tagsRemoveSpaces.split(",");
  // console.log('tags => ', tags);
  // console.log('req.file==>',req.body);
  if (checkTitle === null) {
    let newPost = new db.ScholarshipPost({
      title: req.body.title,
      description: req.body.description,
      applicationstart: req.body.applicationstart,
      applicationdeadline: req.body.applicationdeadline,
      poster: req.file.filename,
      eligibility: req.body.eligibility,
      tags: tags,
    });

    await newPost.save((err, checkTitle) => {
      if (err) return res.json({ Error: err });
      return res.json(newPost);
    });
  } else {
    fs.promises.unlink(uploadFilePath + "/" + req.file.filename);
    return res.json({ message: "alreadExisted" });
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
      await fs.promises.unlink(uploadFilePath + "/" + prev.poster);
      const result = await db.ScholarshipPost.deleteOne({ _id: id });
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

exports.updateScholarship = async (req, res) => {
  const chk = req.file;
  let tagsRemoveSpaces = req.body.tags.replace(/\s/g, "");
  let tags = tagsRemoveSpaces.split(",");
  console.log(tags);
  if (chk) {
    const fetchDetails = await db.ScholarshipPost.findOne({
      _id: req.params.id,
    });
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipPost.findOneAndUpdate(
        { _id: fetchDetails.id },
        {
          title: req.body.title,
          description: req.body.description,
          applicationstart: req.body.applicationstart,
          applicationdeadline: req.body.applicationdeadline,
          poster: req.file.filename,
          eligibility: req.body.eligibility,
          tags: tags,
        }
      );
      if (updateDetails) {
        // console.log(uploadFilePath + "/" + fetchDetails.poster);
        await fs.promises.unlink(uploadFilePath + "/" + fetchDetails.poster);
        res
          .status(201)
          .json({ message: "Updated Successfully Details and Poster" })
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
    const fetchDetails = await db.ScholarshipPost.findOne({
      _id: req.params.id,
    });
    if (fetchDetails) {
      const updateDetails = await db.ScholarshipPost.findOneAndUpdate(
        { _id: fetchDetails.id },
        {
          title: req.body.title,
          description: req.body.description,
          applicationstart: req.body.applicationstart,
          applicationdeadline: req.body.applicationdeadline,
          eligibility: req.body.eligibility,
          tags: tags,
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

exports.getLastThreeScholarship = expressAsyncHandler(
  async (req, res, next) => {
    try {
      const fetch = await db.ScholarshipPost.find().skip(
        db.ScholarshipPost.count() - 3
      );
      res.status(200).send(fetch);
      res.end();
    } catch {
      res.status(404).json({ message: "Not Found" });
    }
  }
);
