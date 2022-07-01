const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const repliesSchema = new Schema(
    {
        body: { type: String, max: 500, },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
        deletedAt: { type: Date, default: null, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("replies", repliesSchema);
