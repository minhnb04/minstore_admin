const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Product = new Schema({
    productName: String,
    brand: String,
    classify: String,
    color: String,
    quantity: Number,
    specifications: String,
    memory:Number,
    price:Number,
    lastUpdated: String,
    productImages: Array,
    status: Boolean
})

module.exports = mongoose.model('Product', Product)