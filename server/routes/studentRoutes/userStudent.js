var express = require("express");
var router = express.Router();
var studentController = require("../../controller/studentControlller/userStudent");
const {
  stdAuth,
  checkstd,
} = require("../../authmiddleware/studentAuthMiddleware");
router.get("*", checkstd);
router.post("/signup", studentController.studentSignUp);

router.post("/login", studentController.studentLogin);
router.post("/dashboard", stdAuth);

module.exports = router;
