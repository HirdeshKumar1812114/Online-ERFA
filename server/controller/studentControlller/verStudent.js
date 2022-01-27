const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.checkStudent = expressAsyncHandler(async function (req, res) {
  try {
    console.log(req.body.regid);
    const checkRegid = await db.VerStudent.findOne({ regno: req.body.regid });
    console.log(checkRegid);
    if (checkRegid !== null) {
      res.status(200).json({ message: "Student part of the university" });
      res.end();
    } else {
      res.status(400).json({ message: "Student not part of the university" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});
