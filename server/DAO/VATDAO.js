const mongoose = require('mongoose');
var {Schema} = mongoose;

var VATSchema = new Schema({
    kind: String,
    displayName: String,
    percentage: Number
});

var VATDAO = mongoose.model('VATs',VATSchema);
module.exports = VATDAO;