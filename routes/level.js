const router = require("express").Router();
const Level = require("../models/level");
const isAuth = require("./../utilities/auth");

router.post('/level', isAuth, async (req, res) => {
    const lev = await Level.findOne({ name: req.body.name, type: req.body.type })
    const body = req.body
    body.createdBy = req.user._id
    const newLevel = new Level(body)
    try {
        if (lev) {
            return res.status(400).json(`${req.body.name} already Exists kindly add a different type`)
        }
        const savedinst = await newLevel.save()
        res.status(200).json(savedinst)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/levels', async (req, res) => {
    try {
        var type = req.query.type
        if (type === undefined) {
            const insti = await Level.find().populate('type')
            res.status(200).json(insti)
        } else {
            const levalr = await Level.find({ type: type })
            return res.status(200).json(levalr)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



module.exports = router;