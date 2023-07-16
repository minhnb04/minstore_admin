const express = require('express');
const router = express.Router();
const multer = require('multer');

const authController = require('../config/controllers/authController')
const productController = require('../config/controllers/productController')

const storage = multer.diskStorage({
    destination:(req, file,res)=>{
        res(null, 'uploads/productImage')
    },
    filename: (req, file, res)=>{
        res(null,Date.now()+'-'+file.originalname)
    }
})

var upload = multer({storage:storage});

router.get('/', productController.index);

router.post('/add-product',authController.checkPermissionStaff,upload.array('productImages', 8), productController.addProduct);

router.put('/update/:id',authController.checkPermissionStaff, upload.array('productImages', 8), productController.updateProduct);

router.delete('/delete/:id',authController.checkPermissionStaff,  productController.deleteProduct);

router.get('/search',authController.checkPermissionStaff, productController.searchProduct);

//api trả về ProductsJSON
router.get('/getProducts', productController.getProducts);

module.exports = router;


