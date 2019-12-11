const mongoose = require('mongoose');
var {Schema} = mongoose;

var StockSchema = new Schema({
    coffeeShopId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    quantityAcc: Number,
    quantityCon : Number,
    priceSell : Number
});

var StockDAO = mongoose.model('Stocks',StockSchema);
module.exports = StockDAO;