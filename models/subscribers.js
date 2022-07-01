const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscriberSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        fcm_token: {
            type: String,
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
