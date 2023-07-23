const Order = require('../../models/order');
const Product = require('../../models/product');


class OrderController {

    async getProducts(req, res, next) {
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
                        specifications: product.specifications,
                        memory: product.memory,
                        price: product.price,
                        productImages: product.productImages,
                    }
                })
                res.products = lsProduct
                next()
            })
            .catch((error) => {
                next(error)
            })

    }

    async index(req, res,next) {
        const userlogin = req.userlogin
        const lsProduct = res.products
        await Order.find()
            .then((orders) => {
                var lsOrder = orders.map(function (order) {
                    var date = order.date
                    date = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
                    return {
                        buyerName: order.buyerName,
                        phoneNumber: order.phoneNumber,
                        address: order.address,
                        product: {
                            id: order.product._id,
                            productName: order.product.productName,
                            color: order.product.color,
                            memory: order.product.memory,
                            productImages: order.product.productImages,
                            price: order.product.price,
                        },
                        quantity: order.quantity,
                        priceOrder: order.priceOrder,
                        date: date,
                        paymentStatus: order.paymentStatus,
                        orderStatus: order.orderStatus,
                    }
                })
 
                console.log(lsOrder);
                res.render('orders', { title: 'Orders Management', userlogin, lsOrder, lsProduct })
            })
            .catch((error) => {
                next(error)
            })

    }


    async addOrder(req, res, next) {
        console.log(req.body);

        if (req.body.buyerName
            && req.body.phoneNumber
            && req.body.address
            && req.body.product
            && req.body.quantity
            && req.body.priceOrder
            && req.body.date
        ) {

            await Product.find({_id:req.body.product})
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
                        specifications: product.specifications,
                        memory: product.memory,
                        price: product.price,
                        productImages: product.productImages,
                    }
                })
                res.productBuy = lsProduct[0]
            })
            .catch((error) => {
                next(error)
            })

            var order = new Order(
                {
                    buyerName: req.body.buyerName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,

                    product: {
                        id: res.productBuy._id,
                        productName: res.productBuy.productName,
                        color: res.productBuy.color,
                        memory: res.productBuy.memory,
                        productImages: res.productBuy.productImages,
                        price: res.productBuy.price,
                    },

                    quantity: req.body.quantity,
                    priceOrder: req.body.priceOrder,
                    date: req.body.date,
                    price: req.body.price,
                    paymentStatus: req.body.paymentStatus,
                    orderStatus: req.body.orderStatus,
                })

            await order.save()
                .then((result) => {
                    console.error('Create order successfuly!!!:');
                    res.redirect('/orders')
                })
                .catch((error) => {
                    console.error('Error creating order:', error);
                    res.json(error)
                });

        } else {
            console.log("Yêu cầu nhập đầy đủ thông tin!")
        }

    }

}

module.exports = new OrderController;