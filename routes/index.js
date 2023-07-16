const express = require('express');
const router = express.Router();

const authController = require('../config/controllers/authController')
const indexController = require('../config/controllers/indexController')

router.get('/',authController.checklogin, indexController.index);

router.get('/login', authController.showLogin);

router.post('/login', authController.login, authController.loginSuccessfully);


module.exports = router;

