const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.login = expressAsyncHandler(async (req, res) => {
  const newPanelist = new db.UserPanelist({
    name: req.body.name,
  });
  if (newPanelist) {
    const savePanelist = await newPanelist.save();
    res.status(201).send(savePanelist);
  } else {
    res.status(404).json("No username enter");
  }
});
