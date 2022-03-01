const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
value:{ type: String,required: true},
time:{type:String,required:true},
date:{type:String,required:true},
venue:{type:String,required:true}
})

const token = mongoose.model('Token',TokenSchema)
module.exports=token;