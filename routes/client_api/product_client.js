const express = require('express');
const router = express.Router();

const productClientController = require('../../config/clientController/productClientController')

//api trả về ProductsJSON
// /productCilent/getProducts
router.get('/getProducts', productClientController.getProducts);


module.exports = router;


