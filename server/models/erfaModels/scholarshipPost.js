const mongoose = require("mongoose");
const ScholarshipPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  applicationstart: { type: String, required: true },
  applicationdeadline: { type: String, required: true },
  poster: { type: String },
  description: { type: String, required: true },
  postingdate: { type: Date, default: Date.now },
  eligibility: [String],
  tags: [String],
});

const sps = mongoose.model("Scholarshippost", ScholarshipPostSchema);
module.exports = sps;
