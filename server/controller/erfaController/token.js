const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");


exports.applyToken=expressAsyncHandler(async (req,res,next)=>{

    console.log(req.body.value);
    console.log(req.body.time);
    console.log(req.body.date);
    console.log(req.body.venue);
    try{
  let makeToken = new db.Token({
      value:req.body.value,
      time: req.body.time,
      date: req.body.date,
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
})

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