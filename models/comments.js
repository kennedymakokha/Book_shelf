const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = new mongoose.Schema(
    {
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        replies: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        body: { type: String, max: 500, },
        deletedAt: { type: Date, default: null, },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog' },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentsSchema);
