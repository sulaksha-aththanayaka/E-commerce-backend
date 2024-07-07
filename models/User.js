import mongoose, { mongo } from 'mongoose'
import roles from '../utils/roles.js'

const userSchema = mongoose.Schema({
    username: {
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
        default: roles.user
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;