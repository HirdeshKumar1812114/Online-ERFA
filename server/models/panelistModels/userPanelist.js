const mongoose = require("mongoose");
const userPanelistSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const userPanelist = mongoose.model("Userpanelist", userPanelistSchema);
module.exports = userPanelist;
