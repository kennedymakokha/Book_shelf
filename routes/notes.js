const router = require("express").Router();
const Notes = require("../models/notes");
const isAuth = require("./../utilities/auth");
var multer = require('multer');
var Paginate = require('./helpers/paginators/notes');
var { validateNoteInput } = require('./../validations/noteValidation')
var { v4 } = require('uuid');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + './../public/uploads/files');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "application/pdf" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf are allowed'));
        }
    }
});
router.post('/note', [upload.single('file'), isAuth], async (req, res) => {
// console.log(req.body)
    const NoteExists = await Notes.findOne({ title: req.body.title, type: req.body.type, createdBy: req.user._id })
    const url = req.protocol + '://' + req.get('host');
    const { errors, isValid } = validateNoteInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
        console.log(errors)
    }
    if (!req.file) {
        return res.status(400).json({ success: false, message: "file Is Required !" });
    }
    if (NoteExists) {
        return res.status(400).json({ success: false, message: 'You already added this piece of work' });
    }
    const body = req.body
    body.title=  req.body.title
    body.createdBy = req.user._id
    body.file = url + '/uploads/files/' + req.file.filename
    const newNotes = new Notes(body)
    try {
        const saveNote = await newNotes.save()
        res.status(200).json(saveNote)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/notes',[Paginate(Notes)], async (req, res) => {
    try {
       
        const e = res.paginate
        res.status(200).json(e)
       
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/notes/mynotes', isAuth, async (req, res) => {
    try {
        var type = req.query.type
        var instituition = req.query.instituition
        var level = req.query.level
        var area = req.query.area
        if (type) {
            const Notess = await Notes.find({ type: type, createdBy: req.user._id })
            res.status(200).json(Notess)
        }
        if (instituition) {
            const Notess = await Notes.find({ instituition: instituition, createdBy: req.user._id })
            res.status(200).json(Notess)
        }
        if (level) {
            const Notess = await Notes.find({ level: level, createdBy: req.user._id })
            res.status(200).json(Notess)
        }
        if (area) {
            const Notess = await Notes.find({ area: area, createdBy: req.user._id })
            res.status(200).json(Notess)
        }
        const Notess = await Notes.find({ createdBy: req.user._id })
        console.log(Notess)
        res.status(200).json(Notess)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/note/:slug', async (req, res) => {
    try {
        const Notess = await Notes.findOne({ slug: req.params.slug }).populate(["type", "level", "instituition", "area"])

        res.status(200).json(Notess)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post("/note/:id/like", isAuth, async (req, res) => {
    try {

        const note = await Notes.findOne({ slug: req.params.id });

        if (!note.likes.includes(req.user._id)) {
            await note.updateOne({ $push: { likes: req.user._id } });

            res.status(200).json("The note has been liked");
        } else {
            await note.updateOne({ $pull: { likes: req.user._id } });
            console.log('disliked')
            res.status(200).json("The note has been disliked");

        }
        console.log()
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/note/:id/delete', isAuth, async (req, res) => {
    const notep = await Notes.findOne({ _id: req.params.id })
    const state = notep.deletedAt
    await Notes.findOneAndUpdate({ _id: req.params.id }, { deletedAt: state === null ? Date() : null }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'deactivation  failed ', err });
        }

        return res.status(200).json({ success: true, Message: `${user.title} Deactivated` });
    })
})
router.put('/note/:id/publish', isAuth, async (req, res) => {
    const notep = await Notes.findOne({ _id: req.params.id })
    const state = notep.published

    console.log(!state)
    await Notes.findOneAndUpdate({ _id: req.params.id }, { published: state ? false : true }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'publish  failed ', err });
        }

        return res.status(200).json({ success: true, Message: `${user.title} published` });
    })
})




module.exports = router;