const mongoose = require("mongoose");
const userPanelistSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

const userPanelist = mongoose.model("Userpanelist", userPanelistSchema);
module.exports = userPanelist;
