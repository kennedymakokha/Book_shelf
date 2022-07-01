const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QrepliesSchema = new Schema(
    {
        body: { type: String, max: 500, },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
       
        deletedAt: { type: Date, default: null, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Qreplies", QrepliesSchema);
