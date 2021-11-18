const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.addScholarshipPost = expressAsyncHandler(async (req, res, next) => {
  const check = new db.ScholarshipPost({
    title: req.body.title,
    description: req.body.description,
    eligibility: req.body.eligibility,
    tags: req.body.tags,
  });
  try {
    const newSp = await check.save();
    if (newSp) {
      res.status(201).send(newSp);
    } else {
      res.status(400).json({ message: "Error in making new Scholarship Post" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error in catch block" });
  }
});
