const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.schedule=expressAsyncHandler(async(req, res, next)=>{
try{

  const addNewRecord=new db.Interview({

    startDate:req.body.startDate,
    endDate:req.body.endDate,
    startTime:req.body.startTime,
    endTime:req.body.endTime,
    venue: req.body.venue,

  })
  
  const checkRecord=await addNewRecord.save();

  if(checkRecord){
res.status(200).send({message:'Interview Scheduled!',checkRecord:checkRecord});
  }
  else{
      res.status(400).send({message:'Error in saving the data '})
  }
res.end();
}catch(error){
    res.status(500).send({message: error.message});
}
})

exports.getInterviewDetail=expressAsyncHandler(async(req,res,next)=>{
 try{
    const getInterviewId=req.params.id;
    const findRecord= await db.Interview.findOne({_id:getInterviewId})

    if(findRecord){
res.status(200).send(findRecord)

    }else{
        res.status(400).send({message:'Error in saving'})

    }

    res.end();
 }
 catch(error){
    res.status(500).send({message: error.message});
 }
})
exports.getAllInterviewDetails= expressAsyncHandler(async (req, res,next) => {
  try {
    const findAllInterview = await db.Interview.find({
    });
    if (findAllInterview) {
      res.status(200).send(findAllInterview);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).send("Error in delete catch block");
  }

  }
)

exports.reSchedule = expressAsyncHandler(async(req, res, next)=>{

try{
const updateInterviewDetails = await db.Interview.findByIdAndUpdate(
  req.params.id,
  { $set: req.body }
)

if(updateInterviewDetails){
  res.status(200).send({message:'Update!'})
}else{
res.status(400).send({message:'Not Update!'})
}
}
catch(error){
  res.status(500).send("Error in delete catch block");
}

})


exports.removeSchdule= expressAsyncHandler(async(req, res, next)=>{
try{
await db.Interview.findByIdAndDelete(req.params.id);
res.status(200).send({message:'Successfully Delete!'})
res.end();
}
catch(error){
res.status(500).send({message:'Error in catch block'})
}
})