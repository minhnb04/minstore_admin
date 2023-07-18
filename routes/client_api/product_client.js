const express = require('express');
const router = express.Router();

const productClientController = require('../../config/clientController/productClientController')

//api trả về ProductsJSON
// /productCilent/getProducts
router.get('/getProducts', productClientController.getProducts);

router.get('/getMobiles', productClientController.getMobiles);

router.get('/getTablets', productClientController.getTablets);

router.get('/getAccessories', productClientController.getAccessories);



module.exports = router;


