const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order_schema = new Schema({
    
});

const orders = mongoose.model('orders', order_schema);
module.exports = orders;