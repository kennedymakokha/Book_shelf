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
        try {
            var type = req.query.type
            var instituition = req.query.instituition
            var level = req.query.level
            var area = req.query.area
            var word = req.query.word
            var searchKey = new RegExp(`${word}`, 'i')
            if (type) {
                results.results = await model.find({ type: type, }).limit(limit).skip(startIndex)
                    .exec()
                admin.results = await model.find({}).limit(limit).skip(startIndex)
                    .exec()

                res.paginate = { results, admin }
                next()
                console.log(`Type:` + (JSON.stringify(results)))

            }
            if (word) {
                results.results = await model.find({ title: searchKey, }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()
                console.log(`Type:` + (JSON.stringify(results)))

            }
            if (instituition) {
                results.results = await model.find({ instituition: instituition, deletedAt: null, }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()


            }
            if (level) {
                results.results = await model.find({ level: level, deletedAt: null, }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()

            }
            if (area) {
                results.results = await model.find({ area: area, deletedAt: null, }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()
            } else {
                results.results = await model.find({ deletedAt: null, }).limit(limit).skip(startIndex)
                    .exec()
                admin.results = await model.find({}).limit(limit).skip(startIndex)
                    .exec()

                res.paginate = { results, admin }
                next()


            }
            // admin

            if (type) {
                admin.results = await model.find({ type: type }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()

            }
            if (instituition) {
                admin.results = await model.find({ instituition: instituition }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()

            }
            if (level) {
                admin.results = await model.find({ level: level }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()

            }
            if (area) {
                admin.results = await model.find({ area: area }).limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()
            } else {
                admin.results = await model.find().limit(limit).skip(startIndex)
                    .exec()
                res.paginate = { results, admin }
                next()


            }



        } catch (error) {
            res.status(400).json({ message: error.message })
        }

        // await model.slice(startIndex, endIndex)

    }

}


module.exports = paginated