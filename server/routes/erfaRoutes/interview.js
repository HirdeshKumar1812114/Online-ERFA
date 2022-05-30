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


module.exports = router;