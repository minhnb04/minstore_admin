var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('sales', { title: 'Sales' });
});

module.exports = router;
