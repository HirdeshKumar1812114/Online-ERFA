const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.verfiStudent = expressAsyncHandler(async (req, res) => {
  const checkDetails = req.body.regid;

  try {
    const compareDetails = await db.VerificationStudent.findOne({
      regno: checkDetails,
    });

    if (compareDetails) {
      res.redirect(307, "/student/signup");
    } else {
      res.status(400).json({ message: "Student Details not match" });
    }
  } catch {
    res.status(400).json({ message: "error in catch block" });
  }
});
