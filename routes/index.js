const express = require('express');
const router = express.Router();

const authController = require('../config/controllers/authController')
const indexController = require('../config/controllers/indexController')
const analysisController = require('../config/controllers/analysisController')

router.get('/',authController.checklogin, analysisController.getSalesByYear, indexController.index);

router.get('/login', authController.showLogin);

router.post('/login', authController.login, authController.loginSuccessfully);


module.exports = router;