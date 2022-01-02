var express = require("express");
var router = express.Router();
var scholarshipPostController = require("../../controller/erfaController/scholarshipPost");
router.post(
  "/add",
  scholarshipPostController.uploadImg,
  scholarshipPostController.addScholarshipPost
);
router.get("/all", scholarshipPostController.getAllScholarship);
router.get("/view/:id", scholarshipPostController.getScholarship);
router.delete("/delete/:id", scholarshipPostController.deleteScholarship);
router.put("/edit/:id", scholarshipPostController.updateScholarship);
module.exports = router;
