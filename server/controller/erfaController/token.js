const expressAsyncHandler = require("express-async-handler");

const schedule = require('node-schedule');
const db = require("../../models");
var time = new Date();
var i=0;
var minTime=  15;


const job = schedule.scheduleJob('0 0 23 * *', function(){

i=0;


});

exports.applyToken=expressAsyncHandler(async (req,res,next)=>{
  
if(i<37){

  i=i+1;
  time.setMinutes(time.getMinutes()+(minTime))
  console.log(time.getMinutes()+(minTime))
  var timeExp  =time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  var dd = String(time.getDate()).padStart(2, '0');
var mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = time.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  console.log(timeExp)

    console.log(req.body.value);
  
 
    console.log(req.body.venue);
    try{
  let makeToken = new db.Token({
      value:i,
      time:timeExp,
      date: today,
      venue: req.body.venue,
  })
  
  const saveToken= await makeToken.save();
  if(saveToken){
      res.status(200).send(saveToken);
      res.end()
  }

    }catch(err){
        res.status(500).send({message:err.message})
    }
  }
  else{
    res.status(500).send("No more tokens available for the day")
  }
}
)

exports.getAllTokens= expressAsyncHandler(async (req, res, next)=>{
    try{
    
    const fetchAllTokens = await db.Token.find();
    
    if(fetchAllTokens){
        res.status(200).send(fetchAllTokens)
        res.end();
    }


    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

exports.getToken=expressAsyncHandler(async (req, res, next) => {
    try {
      const token = await db.Token.findOne({ _id: req.params.id });
      if (token) {
        res.status(200).send(token);
        res.end();
      } else {
        res.status(400).json({ message: "Not found" });
      }
    } catch (err) {
      res.status(400).send("Error in delete catch block");
    }
  });
 
  
  exports.removeToken= expressAsyncHandler(async(req, res, next)=>{
    try{
    await db.Token.findByIdAndDelete(req.params.id);
    res.status(200).send({message:'Successfully Delete!'})
    res.end();
    }
    catch(error){
    res.status(500).send({message:'Error in catch block'})
    }
    })


    exports.updateToken = expressAsyncHandler(async(req, res, next)=>{

        try{
        const token = await db.Token.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        )
        
        if(token){
          res.status(200).send({message:'Update!'})
        }else{
        res.status(400).send({message:'Not Update!'})
        }
        }
        catch(error){
          res.status(500).send("Error in delete catch block");
        }
        
        })