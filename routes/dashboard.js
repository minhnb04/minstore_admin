var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const userlogin = req.userlogin
  res.render('dashboard', { title: 'Dashboard', userlogin });
});

module.exports = router;
