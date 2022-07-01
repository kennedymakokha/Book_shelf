const router = require("express").Router();
const Instituition = require("../models/instituition");
const isAuth = require("./../utilities/auth");

router.post('/instituition', isAuth, async (req, res) => {
    const inst = await Instituition.findOne({ name: req.body.name, type: req.body.type })
    const body = req.body
    body.createdBy = req.user._id
    const newinstituition = new Instituition(body)
    try {
        if (inst) {
            return res.status(400).json(`${req.body.name} already Exists kindly add a different type`)
        }
        const savedinst = await newinstituition.save()
        res.status(200).json(savedinst)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/instituitions', async (req, res) => {
    try {
        var type = req.query.type
        if (type === undefined) {
            const insti = await Instituition.find()
            return res.status(200).json(insti)
        }
        else {
            const insti = await Instituition.find({ type: type }).populate('type')
            return res.status(200).json(insti)
        }

    } catch (error) {

        res.status(500).json(error)
    }
})




module.exports = router;