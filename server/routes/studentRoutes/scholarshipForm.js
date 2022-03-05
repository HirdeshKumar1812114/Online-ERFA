var express = require("express");
var router = express.Router();
var scholarshipFormController = require("../../controller/studentControlller/scholarshipForm");
router.post(
    "/add",
    scholarshipFormController.uploadForm,
    scholarshipFormController.addScholarshipForm
);
router.get("/all", scholarshipFormController.getAllScholarshipForm);
router.get("/view/:id", scholarshipFormController.getScholarshipForm);
router.post("/applicationform",scholarshipFormController.fetchStudentScholarshipForm)
router.delete("/delete/:id", scholarshipFormController.deleteScholarshipForm);
router.put("/sendstudentmessage/:id",scholarshipFormController.updateMessageStudent)
router.put("/sendofficermessage/:id",scholarshipFormController.updateMessageOfficer)
router.put(
    "/edit/:id",
    scholarshipFormController.uploadForm,
    scholarshipFormController.updateScholarshipForm
  );

module.exports = router;