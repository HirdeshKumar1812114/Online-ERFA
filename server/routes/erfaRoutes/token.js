var express = require("express");
var router = express.Router();
var tokenController = require('../../controller/erfaController/token');


router.post('/applytoken',tokenController.applyToken)
module.exports = router;