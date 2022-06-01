var express = require("express");
var router = express.Router();

var interviewController= require("../../controller/erfaController/interview")

router.post('/schedule',interviewController.schedule)
router.get('/schedule/:id',interviewController.getInterviewDetail)
router.get('/getSchedule',interviewController.getAllInterviewDetails)
router.put('/reschedule/:id',interviewController.reSchedule)
router.delete('/schedule/remove/:id',interviewController.removeSchdule)
router.post("/selectinterviewee",interviewController.selectStudents)
router.post("/sendinterviewemail",interviewController.sendEmailInterview)
router.post("/sendemailpanelist",interviewController.sendPanelistEmail)
router.post("/getstudentdetails",interviewController.fetchStudentRecordsOnStudent)
router.post("/evaluatesapplication",interviewController.evaluateStudent)
router.post("/getallremarksapplication",interviewController.getAllRemarkonApplication)
router.get("/getallinterviewpanleist",interviewController.getAllInterviewPanelistDetails)


module.exports = router;