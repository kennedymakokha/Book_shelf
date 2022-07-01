const router = require("express").Router();
const Blog = require("../models/blogs");
const isAuth = require("./../utilities/auth");
var Paginate = require('./helpers/paginators/blogs');
var multer = require('multer');
var { v4 } = require('uuid');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + './../public/uploads/blogs');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png .jpg are allowed'));
        }
    }
});
var { validateBlogInput } = require('./../validations/blogValidation')

router.post('/blog', [upload.single('file'), isAuth], async (req, res) => {
    const Exists = await Blog.findOne({ title: req.body.title })

    try {
        const body = req.body
        const url = req.protocol + '://' + req.get('host');
        const { errors, isValid } = validateBlogInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        if (req.file) {
            body.file = url + '/uploads/blogs/' + req.file.filename
            // return res.status(400).json({ success: false, message: "img Is Required !" });
        }
        if (Exists) {
            return res.status(400).json({ success: false, message: `${req.body.title} already Exists kindly add a different article` });
            
        }


        body.createdBy = req.user._id

        const newBlog = new Blog(body)
        const savedBlog = await newBlog.save()
        return res.status(200).json(savedBlog)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/blogs', [Paginate(Blog)], async (req, res) => {
    try {
        // const Blogs = await Blog.find({ deletedAt: null })
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.post('/blog/like/:id', [isAuth], async (req, res) => {
    const blo = await Blog.findById(req.params.id)
    let likes = []
    const liked = blo.likes.find((m) => m === req.params.id)
    if (!liked) {
        likes.push(req.params.id)
        await Blog.findOneAndUpdate({ _id: req.params.id }, { likes: likes }, { new: true, useFindAndModify: false }, (err, user) => {
            if (err) {
                return res.status(400).json({ success: false, Message: 'liking  failed ', err });
            }

            return res.status(200).json({ success: true, Message: `${blo.title} liked` });
        })
    } else {
        console.log('like already')
        return res.status(200).json({ success: false, Message: 'liked already' });
    }


})
router.get('/blog/:id', async (req, res) => {
    try {
        const Blogs = await Blog.findOne({ slug: req.params.id })
        res.status(200).json(Blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})


router.put('/blog/:id/delete', isAuth, async (req, res) => {
    const notep = await Blog.findOne({ _id: req.params.id })
    const state = notep.deletedAt
    await Blog.findOneAndUpdate({ _id: req.params.id }, { deletedAt: state === null ? Date() : null }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'deactivation  failed ', err });
        }

        return res.status(200).json({ success: true, Message: `${user.title} Deactivated` });
    })
})
router.put('/blog/:id/publish', isAuth, async (req, res) => {
    const notep = await Blog.findOne({ _id: req.params.id })
    const state = notep.published

    await Blog.findOneAndUpdate({ _id: req.params.id }, { published: state ? false : true }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, Message: 'publish  failed ', err });
        }

        return res.status(200).json({ success: true, Message: `${user.title} published` });
    })
})

module.exports = router;