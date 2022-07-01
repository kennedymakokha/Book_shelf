const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const areaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Type'
        },
        level: {
            type: Schema.Types.ObjectId,
            ref: 'Level'
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        deletedAt: { type: Date, default: null, },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);
