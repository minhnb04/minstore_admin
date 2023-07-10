var express = require('express');
var router = express.Router();
const multer = require('multer');

var productController = require('../config/controllers/productController')

var storage = multer.diskStorage({
    destination:(req, file,res)=>{
        res(null, 'uploads/productImage')
    },
    filename: (req, file, res)=>{
        res(null,Date.now()+'-'+file.originalname)
    }
})

var upload = multer({storage:storage});

router.get('/', productController.index);

router.post('/add-product',upload.array('productImages', 8), productController.addProduct);

router.put('/update/:id',upload.array('productImages', 8), productController.updateProduct);

router.delete('/delete/:id', productController.deleteProduct);

router.get('/search', productController.searchProduct);

module.exports = router;


