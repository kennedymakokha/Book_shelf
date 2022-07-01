const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Type", typesSchema);
