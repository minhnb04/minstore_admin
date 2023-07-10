
const Product = require('../../models/product');
const fs = require('fs');

class ProductController {

    async index(req, res){
        await Product.find()
            .then((products) => {
                var lsProduct = products.map(function (product) {
                    var date = product.lastUpdated
                    date = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
                    return {
                        _id: product._id,
                        productName: product.productName,
                        brand: product.brand,
                        classify: product.classify,
                        color: product.color,
                        quantity: product.quantity,
                        specifications: product.specifications,
                        memory:product.memory,
                        price:product.price,
                        lastUpdated: date,
                        productImages: product.productImages,
                        status: product.status,
                    }
                })
                console.log(lsProduct)
                var productsJSON = JSON.stringify(lsProduct)
                res.render('products', { title: 'Products Management', lsProduct: lsProduct, productsJSON: productsJSON})
            })
            .catch((error) => {
                next(error)
            })

    }

    async addProduct(req, res, next) {

        if(req.body.productName
            && req.body.brand
            && req.body.classify
            && req.body.color
            && req.body.quantity
            && req.body.specifications
            && req.body.memory
            && req.body.price
            && req.body.lastUpdated
            && req.files
        ){

            const images = req.files.map(file => file.filename);

            var product = new Product(
                {
                    productName: req.body.productName,
                    brand: req.body.brand,
                    classify: req.body.classify,
                    color: req.body.color,
                    quantity: req.body.quantity,
                    specifications: req.body.specifications,
                    memory:req.body.memory,
                    price:req.body.price,
                    lastUpdated: req.body.lastUpdated,
                    productImages: images,
                    status: req.body.quantity > 0,
                })
            try {
                await product.save()
                    .then((result) => {
                        console.log('Product created:', result);
                        res.redirect('/products')
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        res.json(error)
                    });
            }catch (err) {
                console.error(err);
            }
        }else {
            console.log("Yêu cầu nhập đầy đủ thông tin!")
        }

    }

    async updateProduct(req, res, next) {
        try{
            const currentProduct = await Product.findById(req.params.id)
            const oldproductImage = currentProduct.productImages;
            var images;
            if(req.files.length > 0){
                images = req.files.map(file => file.filename);
            }
            else {
                images = oldproductImage.slice()
            }

            await Product.updateOne({_id: req.params.id},
                {
                    productName: req.body.productName,
                    brand: req.body.brand,
                    classify: req.body.classify,
                    color: req.body.color,
                    quantity: req.body.quantity,
                    specifications: req.body.specifications,
                    memory: req.body.memory,
                    price: req.body.price,
                    lastUpdated: req.body.lastUpdated,
                    productImages: images,
                    status: req.body.status,
                }
            )
                .then(function(){

                    if (JSON.stringify(oldproductImage) != JSON.stringify(images)) {
                        oldproductImage.forEach(function (image){
                            fs.unlinkSync('uploads/productImage/'+image);
                        })
                    }

                    res.redirect('/products')
                })
                .catch(next)

        }catch (err) {
            console.error(err);
        }



    }

    async deleteProduct(req, res, next) {
        const currentProduct = await Product.findById(req.params.id)
        const oldproductImage = currentProduct.productImages;

        await Product.deleteOne({ _id: req.params.id })
            .then(()=>{
                oldproductImage.forEach(function (image){
                    fs.unlinkSync('uploads/productImage/'+image);
                })
                return res.redirect('/products')
            })
            .catch(next)
    }

    searchProduct(req, res, next) {
        var keyword_search = req.query.keyword_search
        var keyword_search_number;
        if (isNaN(keyword_search) == false){
            keyword_search_number = Number(keyword_search)
        }
        var query = Product.where({
            $or:[
                {productName:{$regex:keyword_search, $options:'i'}},
                {brand:{$regex:keyword_search, $options:'i'}},
                {classify:{$regex:keyword_search, $options:'i'}},
                {color:{$regex:keyword_search, $options:'i'}},
                {memory:{$eq:keyword_search_number}},
                {price:{$eq:keyword_search_number}},
                {quantity:{$eq:keyword_search_number}},
            ]
        })

        Product.find(query)
            .then((product)=>{
                var lsProduct = product.map(function (product) {
                    var date = product.lastUpdated
                    date = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)

                    return {
                        _id: product._id,
                        productName: product.productName,
                        brand: product.brand,
                        classify: product.classify,
                        color: product.color,
                        quantity: product.quantity,
                        specifications: product.specifications,
                        memory:product.memory,
                        price:product.price,
                        lastUpdated: date,
                        productImages: product.productImages,
                        status: product.status,
                    }
                })
                console.log(lsProduct)
                var productsJSON = JSON.stringify(lsProduct)
                res.render('products', { title: 'Products Management', lsProduct: lsProduct, productsJSON: productsJSON})
            })
            .catch((error)=>{
                next(error)
            })

    }
}

module.exports = new ProductController;