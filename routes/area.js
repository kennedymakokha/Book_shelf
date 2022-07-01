const router = require("express").Router();
const Area = require("../models/areas");
const isAuth = require("./../utilities/auth");

router.post('/area', isAuth, async (req, res) => {
    const are = await Area.findOne({ name: req.body.name, type: req.body.type })
    const body = req.body
    body.createdBy = req.user._id
    const newArea = new Area(body)
    try {
        if (are) {
            return res.status(400).json(`${req.body.name} already Exists kindly add a different type`)
        }
        const savedarea = await newArea.save()
        res.status(200).json(savedarea)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/areas', async (req, res) => {
    try {
        var type = req.query.type
        if (type === undefined) {
            const are = await Area.find({})
            res.status(200).json(are)
        }
        else {
            const are = await Area.find({ type: type,deletedAt:nul })
            res.status(200).json(are)
        }

    } catch (error) {

        res.status(500).json(error)
    }
})
router.put('/area/:id/delete', isAuth, async (req, res) => {
    const notep = await Area.findOne({ _id: req.params.id })
    const state = notep.deletedAt
    await Area.findOneAndUpdate({ _id: req.params.id }, { deletedAt: state === null ? Date() : null }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'deactivation  failed ', err });
        }

        return res.status(200).json({ success: true, Message: `${notep.name} Deactivated` });
    })
})

module.exports = router;