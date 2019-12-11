const mongoose = require('mongoose');
var {Schema} = mongoose;

var ProductSchema = new Schema({
    name: String,
    displayName: String,
    kind: String,
    subKind: String,
    ingredients: String,
    priceCost: Number,
    vatKind: String,
    remarks: String,
    pictureURL: String
});

var ProductDAO = mongoose.model('Products',ProductSchema);
module.exports = ProductDAO;