const express = require('express');
const router = express.Router();

const indexController = require('../config/controllers/indexController')

router.get('/',indexController.checklogin, function(req, res, next) {
  var token = req.cookies.token
  if(token){
    res.render('index', { title: 'MinStore' });
  }
  else{
    res.render('login', { title: 'LogIn' })
  }
  
});

router.get('/login', indexController.showLogin);

router.post('/login', indexController.login, indexController.loginSuccessfully);


module.exports = router;

