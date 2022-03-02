var express = require("express");
var router = express.Router();
var tokenController = require('../../controller/erfaController/token');


router.post('/applytoken',tokenController.applyToken)
router.get('/allTokens',tokenController.getAllTokens)
router.get('/find/:id',tokenController.getToken)
router.delete('/delete/:id',tokenController.removeToken)
router.put('/edit/:id',tokenController.updateToken)
module.exports = router;