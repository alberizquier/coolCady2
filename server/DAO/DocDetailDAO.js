const mongoose = require('mongoose');
var {
    Schema
} = mongoose;

var DocDetailSchema = new Schema({
    docHeaderId: mongoose.Types.ObjectId,
    lineNumber : Number,
    productId: mongoose.Types.ObjectId,
    quantity: Number,
    price: Number,
    percentageDiscount: Number,
    vatKind: String,
    title: String,
    remarks: String
});

var DocDetailDAO = mongoose.model('DocDetails', DocDetailSchema);
module.exports = DocDetailDAO;