const router = require("express").Router();
const Blog = require("../models/blogs");
const isAuth = require("./../utilities/auth");
var Paginate = require('./helpers/paginators/blogs');
const Comm = require('./../models/comments')
const Repl = require('./../models/replies')

router.post('/comment', isAuth, async (req, res) => {
    console.log(req.user)
    const Exists = await Comm.findOne({ body: req.body.body, blog: req.body.blog })
    const Exblog = await Blog.findOne({ _id: req.body.blog })
    try {
        const comments = Exblog.comments

        const body = req.body
        if (Exists) {
            return res.status(400).json(`${req.body.body} already Exists kindly add a different comment`)
        }
        body.createdBy = req.user._id
        const newcomment = new Comm(body)
        const savedCommnt = await newcomment.save()
        comments.push(savedCommnt._id)
        const k = await Blog.findOneAndUpdate({ _id: req.body.blog }, { comments: comments }, { new: true, useFindAndModify: false })

        return res.status(200).json(savedCommnt)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
router.post('/reply', isAuth, async (req, res) => {

    const Exists = await Repl.findOne({ body: req.body.body, comment: req.body.comment })
    const Exblog = await Comm.findOne({ _id: req.body.comment })
    try {
        const replies = Exblog.replies

        const body = req.body
        if (Exists) {
            return res.status(400).json(`${req.body.body} already Exists kindly add a different comment`)
        }
        body.createdBy = req.user._id
        const newReplie = new Repl(body)
        const savedReply = await newReplie.save()
        replies.push(savedReply._id)
        const k = await Comm.findOneAndUpdate({ _id: req.body.comment }, { replies: replies }, { new: true, useFindAndModify: false })
        return res.status(200).json(savedReply)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


router.get('/comments/:id', async (req, res) => {
    try {
        const comments = await Comm.find({ blog: req.params.id }).populate(['createdBy',"replies"])
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.put('/comment/:id/delete', async (req, res) => {
    await Comm.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'deactivation  failed ', err });
        }
        return res.status(200).json({ success: true, Message: `${user.body} Deactivated` });
    })
})

module.exports = router;