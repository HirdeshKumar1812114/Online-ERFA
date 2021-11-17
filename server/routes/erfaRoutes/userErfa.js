var express = require("express");
var router = express.Router();
var erfaController = require("../../controller/erfaController/userErfa");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");
router.get("*", checkUserErfa);
router.post("/login", erfaController.erfaLogin);
router.post("/signup", erfaController.erfaSignUp);
module.exports = router;
