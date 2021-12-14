const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var erfaController = require("../../controller/erfaController/userErfa");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");

//router.get("*", checkUserErfa);

router.get("/dashboard", erfaController.checkToken, function (req, res, next) {
  res.status(200).send("verifiedUser");
  res.end();
});
router.post("/login", erfaController.erfaLogin);
router.post("/signup", erfaController.erfaSignUp);
router.post("/changepassword", erfaController.changePassword);
module.exports = router;