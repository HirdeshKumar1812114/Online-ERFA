const mongoose = require('mongoose');
const InterviewSchema = mongoose.Schema({
startDate:{ type: String, required: true},
endDate:{ type: String, required: true},
startTime:{ type: String, required: true},
endTime:{ type: String, required: true},
venue: { type: String, required: true },
scholarship:{type:mongoose.Schema.Types.ObjectId,ref:'Scholarshippost'},
})

const interview = mongoose.model('Interview',InterviewSchema)
module.exports=interview;