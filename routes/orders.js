var express = require('express');
var router = express.Router();

const authController = require('../config/controllers/authController')
const orderController = require('../config/controllers/orderController')


router.get('/',orderController.getProducts , orderController.index);

router.post('/add-order',authController.checkPermissionStaff, orderController.addOrder);

router.put('/update/:id',authController.checkPermissionStaff, orderController.updateOrder);

router.delete('/delete/:id',authController.checkPermissionStaff,  orderController.deleteOrder);


module.exports = router;
