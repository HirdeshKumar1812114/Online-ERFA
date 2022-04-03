const mongoose = require('mongoose');
const InterviewSchema = mongoose.Schema({
startDate:{ type: String, required: true},
endDate:{ type: String, required: true},
startTime:{ type: String, required: true},
endTime:{ type: String, required: true},
venue: { type: String, required: true },
scholarship:{ type: String, required: true}
})

const interview = mongoose.model('Interview',InterviewSchema)
module.exports=interview;