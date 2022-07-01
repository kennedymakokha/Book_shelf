const router = require("express").Router();
const isAuth = require("./../utilities/auth");
var Paginate = require('./helpers/paginators/questions');
const Quiz = require('./../models/questions')
const Repl = require('./../models/qreplies')
const User = require('./../models/users')

router.post('/question', isAuth, async (req, res) => {

    const Exists = await Quiz.findOne({ question: req.body.question })
    try {
        const body = req.body
        if (Exists) {
            return res.status(400).json(`${req.body.question} already submited this`)
        }
        body.createdBy = req.user._id

        const newquestion = new Quiz(body)
        const savedquestion = await newquestion.save()
        return res.status(200).json(savedquestion)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
router.get('/questions', [Paginate(Quiz)], async (req, res) => {
    try {
        // const Blogs = await Blog.find({ deletedAt: null })
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.post('/question/reply', isAuth, async (req, res) => {

    const Exists = await Repl.findOne({ body: req.body.question, question: req.body.question })
    const Exb = await Quiz.findOne({ _id: req.body.question })
    const user = await User.findById(req.user._id)
    try {
        const replies = Exb.replies
        const body = req.body
        if (Exists) {
            return res.status(400).json(`${req.body.question} already Exists kindly add a different ans`)
        }

        body.createdBy = req.user._id
        body.name = `${user.firstname} ${user.surname}`
        const newReplie = new Repl(body)
        const savedReply = await newReplie.save()
        replies.push(savedReply._id)

        const k = await Quiz.findOneAndUpdate({ _id: req.body.question }, { replies: replies }, { new: true, useFindAndModify: false })
        return res.status(200).json(savedReply)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


router.get('/question/:id', async (req, res) => {
    try {
        const comments = await Quiz.findById(req.params.id).populate(['createdBy', "replies"])
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.put('/question/:id/delete', async (req, res) => {
    await Comm.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'deactivation  failed ', err });
        }
        return res.status(200).json({ success: true, Message: `${user.body} Deactivated` });
    })
})

module.exports = router;