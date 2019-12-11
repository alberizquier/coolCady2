const mongoose = require('mongoose');
var {Schema} = mongoose;

var CoffeeShopSchema = new Schema({
    name: String,
    displayName: String,
    address: String,
    pictureURL: String,
    description: String
});

var CoffeeShopDAO = mongoose.model('CoffeeShops',CoffeeShopSchema);
module.exports = CoffeeShopDAO;