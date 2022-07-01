const router = require("express").Router();
const Notes = require("../models/notes");
const Types = require("../models/types");
const isAuth = require("./../utilities/auth");

router.post('/type', isAuth, async (req, res) => {
    const TypeD = await Types.findOne({ name: req.body.name })
    const body = req.body
    body.createdBy = req.user._id
    const newType = new Types(body)
    try {
        if (TypeD) {
            return res.status(400).json(`${req.body.name} already Exists kindly add a different type`)
        }
        const savedType = await newType.save()
        return res.status(200).json(savedType)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/types', async (req, res) => {
    try {
        const type = await Types.find({})
        res.status(200).json(type)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.put('/type/:id/delete', async (req, res) => {
    try {
        const type = await Types.findOneAndDelete({_id:req.params.id})
        res.status(200).json(type)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;