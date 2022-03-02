const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
    value:{ type: String, required: true},
    time:{ type: String, required: true},
    date:{ type: String, required: true},
    venue:{ type: String, required: true}

})

const token= mongoose.model("Token", tokenSchema);
module.exports = token;
