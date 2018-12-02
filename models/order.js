var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerOrder = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'}, //This line of code helps to take the data from the User Model
    shopping: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Order', customerOrder);