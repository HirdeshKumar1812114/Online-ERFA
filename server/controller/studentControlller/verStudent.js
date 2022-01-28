const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.checkStudent = expressAsyncHandler(async function (req, res) {
  try {
    const fetchAllStudent = await db.VerStudent.find();
    console.log(fetchAllStudent);
    if (fetchAllStudent) {
      res.status(200).send(fetchAllStudent);
      res.end();
    } else {
      res.staus(400).send({ message: "Error in retrieving students" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error in catch block" });
  }
});
