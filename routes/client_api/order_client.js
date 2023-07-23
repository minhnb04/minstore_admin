var express = require('express');
var router = express.Router();

const orderClientController = require('../../config/clientController/orderClientController')

router.post('/createOrder', orderClientController.createOrder);




module.exports = router;
