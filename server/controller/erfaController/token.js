const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");


exports.applyToken=expressAsyncHandler(async (req, res)=>{
    try{
    const makeToken = new db.Token
    ({
        value:req.body.value,
        time: req.body.time,
        date: req.body.date,
        venue: req.body.venue,
    })
if(makeToken){
res.status(200).send(makeToken)
res.end();
}else{
    res.status(400).send({message:'Token not given'})
}

    }
    catch(error){
        res.status(500).send({message: error.message});
    }
})