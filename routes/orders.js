var express = require('express');
var router = express.Router();

const orderController = require('../config/controllers/orderController')


router.get('/',orderController.getProducts , orderController.index);

router.post('/add-order', orderController.addOrder);



module.exports = router;
