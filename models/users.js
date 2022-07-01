const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        surname: { type: String },
        imageUrl: { type: String },
        email: { type: String },
        phone: { type: String },
        password: { type: String },
        isAdmin: { type: Boolean, default: false, required: true },
        cc: { type: Boolean, default: false, required: true },
        applied: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);
module.exports = User