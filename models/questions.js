const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new mongoose.Schema(
    {
        replies: [{ type: Schema.Types.ObjectId, ref: 'Qreplies' }],
        // replies:{type:Array, default:[]},
        question: { type: String, max: 500, },
        deletedAt: { type: Date, default: null, },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
