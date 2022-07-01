const e = require("express")
var mongoose = require('mongoose');

const paginated = (model) => {

    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const count = await model.countDocuments().exec()
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const pager = Math.trunc(count / limit)
        const results = {}
        const admin = {}



        if (pager > 1) {
            admin.pager = pager
        }

        if (endIndex < model.countDocuments().exec()) {
            admin.next = {
                page: page + 1,
                limit: limit,

            }
        }
        if (startIndex > 0) {
            admin.previous = {
                page: page - 1,
                limit: limit,

            }
        }
        if (pager > 1) {
            results.pager = pager
        }

        if (endIndex < model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit,

            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,

            }
        }
        try {
            results.results = await model.find({ deletedAt: null }).populate(['createdBy', 'replies']).limit(limit).skip(startIndex).sort({ "createdAt": -1 })
                .exec()

            // results.results = await model.find({ }).limit(limit).skip(startIndex).populate("createdBy")
            //     .exec()
            admin.results = await model.find({}).limit(limit).skip(startIndex)
                .exec()

            res.paginate = { results, admin }
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

        // await model.slice(startIndex, endIndex)

    }

}


module.exports = paginated