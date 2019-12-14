const mongoose = require('mongoose');
var {
    Schema
} = mongoose;

var DocHeaderSchema = new Schema({
    year: Number,
    docNumber: Number,
    coffeeShopId: mongoose.Types.ObjectId,
    docDate : Date,
    sellerId : String,
    clientId : String,
    paymentMethod : String,
    paymentDoc : String,
    paymentAuth : String,
    docKind : String,
    docState : String,
    taxBaseS : Number,
    taxBaseR : Number,
    taxBaseN : Number,
    percentageBaseS : Number,
    percentageBaseR : Number,
    percentageBaseN : Number,
    percentageDiscount : Number,
    amountDue : Number,
    amountPayed : Number,
    totalItems: Number
});

var DocHeaderDAO = mongoose.model('DocHeaders', DocHeaderSchema);
module.exports = DocHeaderDAO;