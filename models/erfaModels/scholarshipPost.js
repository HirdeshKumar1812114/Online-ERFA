const mongoose = require("mongoose");
const ScholarshipPostSchema = new mongoose.Schema({
  title: { type: String },
  applicationstart: { type: String },
  applicationdeadline: { type: String },
  poster: { type: String },
  description: { type: String },
  postingdate: { type: Date, default: Date.now },
  eligibility: String,
  tags: [String],
  checkedPrograms:{ type: String }
});

const sps = mongoose.model("Scholarshippost", ScholarshipPostSchema);
module.exports = sps;
