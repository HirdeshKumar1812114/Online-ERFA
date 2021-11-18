var express = require("express");
var router = express.Router();
var scholarshipPostController = require("../../controller/erfaController/scholarshipPost");
router.post("/add", scholarshipPostController.addScholarshipPost);

module.exports = router;
