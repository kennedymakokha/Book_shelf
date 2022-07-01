const mongoose = require("mongoose");
const Schema = mongoose.Schema;
URLSlugs = require('mongoose-url-slugs');
const instituitionSchema = new mongoose.Schema(
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
instituitionSchema.plugin(URLSlugs('name'));
module.exports = mongoose.model("Instituition", instituitionSchema);
