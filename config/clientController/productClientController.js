
const Product = require('../../models/product');

class ProductClientController {
    
    async getProducts(req, res){
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

                res.json(lsProduct)
            })
            .catch((error) => {
                next(error)
            })

    }


}

module.exports = new ProductClientController;