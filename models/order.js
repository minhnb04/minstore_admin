const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Order = new Schema({
    buyerName: String,
    phoneNumber: String,
    address: String,
    product: {
        id: String,
        productName: String,
        color: String,
        memory:Number,
        productImages: Array,
        price:Number,
    },
    quantity: Number,
    priceOrder:Number,
    date: String,
    paymentStatus: Boolean,
    orderStatus: Boolean
})

module.exports = mongoose.model('Order', Order)