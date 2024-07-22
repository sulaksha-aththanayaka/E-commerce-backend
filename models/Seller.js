import mongoose from 'mongoose'
import roles from '../utils/roles.js'

const sellerSchema = mongoose.Schema({
    businessName: {
        type: String,
        required: [true, "Please enter a username"]
    },
    sellerName: {
        type: String,
        required: [true, "Please enter a username"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    role: {
        type: String,
        default: roles.seller
    }
}, {
    timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;