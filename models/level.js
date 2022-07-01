const mongoose = require("mongoose");
const Schema = mongoose.Schema;
URLSlugs = require('mongoose-url-slugs');
const levelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Type'
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },

    },
    { timestamps: true }
);
levelSchema.plugin(URLSlugs('name'));
module.exports = mongoose.model("Level", levelSchema);
