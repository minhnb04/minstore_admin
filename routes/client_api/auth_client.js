const express = require('express');
const router = express.Router();

const authClientController = require('../../config/clientController/authClientController')

router.get('/showlogin', authClientController.showLogin);

router.post('/login', authClientController.login);

router.post('/checklogin', authClientController.checklogin);


module.exports = router;


