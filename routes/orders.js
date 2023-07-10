var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('orders', { title: 'Orders' });
});

module.exports = router;
