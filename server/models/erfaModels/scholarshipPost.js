const mongoose = require("mongoose");
const ScholarshipPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postingdate: { type: Date, default: Date.now },
  eligibility: { type: String, required: true },
  tags: [String],
});

const sps = mongoose.model("Scholarshippost", ScholarshipPostSchema);
module.exports = sps;
