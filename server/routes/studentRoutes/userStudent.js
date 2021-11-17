var express = require("express");
var router = express.Router();
var studentController = require("../../controller/studentControlller/userStudent");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");

router.get("*", checkStudent);
router.post("/signup", studentController.studentSignUp);

router.post("/login", studentController.studentLogin);
router.post("/dashboard");

module.exports = router;
