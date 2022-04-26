const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var scholarship = require("../../controller/studentControlller/scholarship");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");


router.post("/check_eligibility", scholarship.checkEligibility);

module.exports = router;
