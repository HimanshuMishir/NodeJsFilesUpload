const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_id: String,
    product_description: String,
    product_image_path: String,
    product_available_for: [String],
    product_wear_catagory: String,
    product_brand: String,
    product_specific: {
        product_specific_id: String,
        product: [{
            size:String,
            color: String,
            price: Number,
            stocks: Number
        }],
        product_color: [String],
        product_number_of_stocks: Number
    }
},{
    timestamps: true
}
);
const product_catalog = mongoose.model('products', ProductSchema);
module.exports = product_catalog;