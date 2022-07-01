var mongoose = require('mongoose');
const Schema = mongoose.Schema;
URLSlugs = require('mongoose-url-slugs');
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        // required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    instituition: {
        type: Schema.Types.ObjectId,
        ref: 'Instituition'
    },
    desc: {
        type: String,
        // ref: 'Instituition'
    },
    level: {
        type: Schema.Types.ObjectId,
        ref: 'Level'
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    },
    published: {
        type: Boolean,
        default: 0,
        // required: true
    },
    likes: {
        type: Array,
        default: [],
    },
    deletedAt: { type: Date, default: null, },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },



},
    { timestamps: true });


NotesSchema.plugin(URLSlugs('title'));
module.exports = mongoose.model("Notes", NotesSchema);