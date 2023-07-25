var express = require('express');
var router = express.Router();

const analysisController = require('../config/controllers/analysisController')

router.get('/',analysisController.getSalesByYear, analysisController.index);

module.exports = router;
