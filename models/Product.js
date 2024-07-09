import mongoose from 'mongoose'

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name"]
    },
    brand: {
        type: String,
        required: [true, "Please enter a brand name for the product"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"]
    },
    description: {
        type: String,
        required: [true, "Enter a description about your product"]
    },
    img: {
        type: String,
        required: [true, "Please add an image of the product"]
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productsSchema);

export default Product;