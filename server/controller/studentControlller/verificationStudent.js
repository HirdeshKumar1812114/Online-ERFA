const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.verfiStudent = expressAsyncHandler(async (req, res) => {
  const checkDetails = req.body.regid;

  console.log("Ver1 ");
  try {
    const compareDetails = await db.VerificationStudent.findOne({
      regno: checkDetails,
    });
    console.log("Ver2- try ");
    if (compareDetails) {
      res.redirect(307, "/student/signup");
      console.log("Ver2- try  if");
    } else {
      res.status(400).json({ message: "Student Details not match" });
      console.log("Ver2- try  else");
    }
  } catch {
    res.status(400).json({ message: "error in catch block" });
    console.log("Ver3- catch");
  }
});
