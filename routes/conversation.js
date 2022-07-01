const router = require("express").Router();
const Conversation = require("../models/conversation");
const isAuth = require("./../utilities/auth");

router.post('/conversation', async (req, res) => {
    const exists = await Conversation.find({
        "members": {
            $all: [
                req.body.senderId, req.body.recieverId
            ]
        }
    })
    if (exists.length > 0) {
        console.log('exis')
    } else {
        console.log('not')
    }
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    });
    try {
        if (exists.length > 0) {
            return res.status(200).json('cool')
        } else {
            const savedConversation = await newConversation.save()
            return res.status(200).json(savedConversation)

        }

    } catch (error) {
        res.status(500).json(error)
    }
});
router.get('/conversations', isAuth, async (req, res) => {
    try {

        const Conversations = await Conversation.find({
            members: { $in: [req.user._id] }
        }).populate('members')
        res.status(200).json(Conversations)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});
module.exports = router;