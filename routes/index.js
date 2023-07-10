var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MinStore' });
});

router.get('/sign-in', function(req, res, next) {
  res.render('sign-in', { title: 'SignIn' });
});


module.exports = router;
