var express = require('express');
var router = express.Router();

const analysisController = require('../config/controllers/analysisController')

router.get('/',analysisController.getSalesByYear, function(req, res, next) {
  const salesByYear = res.salesByYear;
  const userlogin = req.userlogin
  res.render('sales', { title: 'Sales', userlogin, salesByYear });
});

module.exports = router;
