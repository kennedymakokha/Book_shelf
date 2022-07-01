const mongoose = require("mongoose");
URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const BlogSchema = new mongoose.Schema(
    {
        createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
        body: { type: String, max: 500, },
        deletedAt: { type: Date, default: null, },
        comments:{type:Array, default:[]},
        published: {type: Boolean,default: 0 },
        likes:{type:Array, default:[]},
        file: { type: String },
        title: { type: String },
    },
    { timestamps: true }
);
BlogSchema.plugin(URLSlugs('title'));
module.exports = mongoose.model("Blog", BlogSchema);
