
const Order = require('../../models/order');

class OrderClientController {
    
    async createOrder(req, res){
        
        var order = new Order(
            {
                buyerName: req.body.buyer,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                product: {
                    id: String,
                    productName: String,
                    color: String,
                    memory:Number,
                    productImages: Array,
                    price:Number,
                },
                quantity: req.body.quantity,
                priceOrder:req.body.price * quantity,
                date: req.body.date,
                paymentStatus: req.body.paymentStatus,
                orderStatus: false
            })
        try {
            await order.save()
                .then((result) => {
                    console.log('Order created:', result);
                    res.redirect(req.headers.referer)
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        }catch (err) {
            console.error(err);
        }
    }
}

module.exports = new OrderClientController;