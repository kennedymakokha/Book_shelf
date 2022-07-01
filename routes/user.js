const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('./../models/users');
var bcrypt = require('bcryptjs');
var generateToken = require('./../utilities/tokenGen');
var isAuth = require('./../utilities/auth');
var { validateRegisterInput } = require('./../validations/userValidation')

const userRouter = express.Router();

// userRouter.get(
//     '/users/seed',
//     expressAsyncHandler(async (req, res) => {
//         await User.remove({});
//         const createdUsers = await User.insertMany(data.users);
//         res.send({ createdUsers });
//     })
// );

userRouter.post(
    '/signin', async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    firstname: user.firstname,
                    surname: user.surname,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    cc: user.cc,
                    applied: user.applied,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })

userRouter.post(
    '/usermail/:mail', async (req, res) => {
        const user = await User.findOne({ email: req.params.mail });
        console.log(req.body)
        const body = req.body
        if (user) {
            res.send({
                _id: user._id,
                firstname: user.firstname,
                surname: user.surname,
                email: user.email,
                isAdmin: user.isAdmin,
                cc: user.cc,
                applied: user.applied,
                token: generateToken(user),
            });
            return;

        }
        else {
            const NewUser = new User({
                firstname: body.givenName,
                imageUrl: body.imageUrl,
                surname: body.familyName,
                email: body.email,
                phone: body.phone,

            })
            await NewUser.save()
            res.send({
                _id: NewUser._id,
                firstname: NewUser.firstname,
                imageUrl: NewUser.imageUrl,
                surname: NewUser.surname,
                email: NewUser.email,
                isAdmin: NewUser.isAdmin,
                cc: NewUser.cc,
                applied: NewUser.applied,
                token: generateToken(NewUser),
            });
            return;
        }

    })

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body
        const userExists = await User.findOne({ email: req.body.email })
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        if (userExists) {
            res.status(401).send({ message: `${req.body.email} is already used kindly use a different email` });
        }

        data.password = bcrypt.hashSync(req.body.password, 8)
        const user = new User(data);
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            firstname: createdUser.firstname,
            surname: createdUser.surname,
            email: createdUser.email,
            phone: createdUser.phone,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    } catch (error) {
        console.log(error)
    }
})
);

userRouter.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
})

// const notep = await Blog.findOne({ _id: req.params.id })
//     const state = notep.published

//     await Blog.findOneAndUpdate({ _id: req.params.id }, { published: state ? false : true }, { new: true, useFindAndModify: false }, (err, user) => {
//         if (err) {
//             return res.status(400).json({ success: false, Message: 'publish  failed ', err });
//         }

//         return res.status(200).json({ success: true, Message: `${user.title} published` });
//     })
userRouter.put('/user/:id/approve', async (req, res) => {
    try {
        const Use = await User.findOne({ _id: req.params.id })
        const state = Use.cc

        await User.findOneAndUpdate({ _id: req.params.id }, { cc: state ? false : true }, { new: true, useFindAndModify: false }, (err, user) => {
            if (err) {
                return res.status(400).json({ success: false, Message: 'approval  failed ', err });
            }

            return res.status(200).json({ success: true, Message: `${Use.firstname} approved` });
        })

    } catch (error) {
        res.status(404).send({ message: 'User Not Found' });
    }
})


userRouter.get('/users/all', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)

    } catch (error) {

    }
})
userRouter.get('/users/applied', async (req, res) => {
    try {
        const applied = await User.find({ applied: true })
        res.status(200).json(applied)
    } catch (error) {

    }
})

userRouter.get('/users/cc', async (req, res) => {
    try {

        const cc = await User.find({ cc: true })
        res.status(200).json(cc)
    } catch (error) {

    }
})



// userRouter.put(
//     '/user/profile',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//         const user = await User.findById(req.user._id);
//         if (user) {
//             user.name = req.body.name || user.name;
//             user.email = req.body.email || user.email;
//             if (req.body.password) {
//                 user.password = bcrypt.hashSync(req.body.password, 8);
//             }
//             const updatedUser = await user.save();
//             res.send({
//                 _id: updatedUser._id,
//                 name: updatedUser.name,
//                 email: updatedUser.email,
//                 isAdmin: updatedUser.isAdmin,
//                 token: generateToken(updatedUser),
//             });
//         }
//     })
// );

userRouter.put('/content-creator-application', isAuth, async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { applied: true }, { new: true, useFindAndModify: false })
    res.send({
        _id: user._id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
    });
});


module.exports = userRouter
