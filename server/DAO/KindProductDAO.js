const mongoose = require('mongoose');
var {Schema} = mongoose;

var KindProductSchema = new Schema({
    kind: String,
    subKind: String,
    description: String
});

var KindProductDAO = mongoose.model('KindProducts',KindProductSchema);
module.exports = KindProductDAO;