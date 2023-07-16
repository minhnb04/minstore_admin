var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const userlogin = res.userlogin
  console.log(userlogin);
  res.render('orders', { title: 'Orders', userlogin });
});

module.exports = router;
