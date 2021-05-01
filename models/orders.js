const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order_schema = new Schema({
    user_id: String,
    user_name: String,
    user_mobile: Number,
    user_email: String,
    user_addresses:[{
        name: String,
        mobile: Number,
        address: {
            house_no: Number,
            street: String,
            pincode: Number,
            city: String,
            state: String
        }

    }],
    order_id: String,
    payment_status: Boolean,
    product_id: String
});

const orders = mongoose.model('orders', order_schema);
module.exports = orders;