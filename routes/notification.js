const express = require("express");
const isAuth = require("./../utilities/auth");
const admin = require('./../firebaseInit');
const Subscriber = require('./../models/subscribers')
const router = express.Router();


router.post("/assign-topic", async (req, res) => {

    try {
        const subscribed = await Subscriber.findOne({ topic: req.body.topic, fcm_token: req.body.fcm_token })

        if (!req.body.fcm_token) {

            return res.status(400).json({ message: 'FCM Token Required !' });

        }

        const topic = req.body.topic
        const tokens = [req.body.fcm_token];
        const result = await admin.messaging().subscribeToTopic(tokens, `${topic}`);
        if (subscribed) {
            await Subscriber.findOneAndUpdate({ topic: req.body.topic, fcm_token: req.body.fcm_token }, { deletedAt: null }, { new: true, useFindAndModify: false })
        }
        else {
            const newSibscriber = new Subscriber({ topic, fcm_token: req.body.fcm_token })
            await newSibscriber.save()
        }
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json(error);

    }

});


router.post("/check-status", async (req, res) => {

    try {

        const subscribed = await Subscriber.findOne({ deletedAt: null, topic: req.body.topic, fcm_token: req.body.fcm_token })
        return res.status(200).json(subscribed);

    } catch (error) {

        return res.status(400).json(error);

    }

});

router.post("/revoke-topic", async (req, res) => {

    try {

        if (!req.body.fcm_token) {

            return res.status(400).json({ message: 'FCM Token Required !' });

        }

        const topic = req.body.topic

        const tokens = [req.body.fcm_token];

        const result = await admin.messaging().unsubscribeFromTopic(tokens, `${topic}`);
        const revoked = await Subscriber.findOneAndUpdate({ topic: req.body.topic, fcm_token: req.body.fcm_token }, { deletedAt: Date() }, { new: true, useFindAndModify: false })

        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json(error);

    }

});


router.post("/send-to-topic", async (req, res) => {
    try {
        var message = {
            data: {
                score: '850',
                time: '2:45'
            },

            notification: {
                title: req.body.title,
                body: req.body.body,
            },

            topic: `${req.body.topic}`

        };

        const result = await admin.messaging().send(message);

        return res.status(200).json(result);

    } catch (error) {
        console.log(error)
        return res.status(400).json(error);

    }

});


router.post("/send-to-individual-token", async (req, res) => {

    try {

        if (!req.body.fcm_token) {

            return res.status(400).json({ message: 'FCM Token Required !' });

        }


        var message = {

            data: {

                score: '850',

                time: '2:45'

            },

            notification: {

                title: req.body.title,

                body: req.body.body,

            },

            token: req.body.fcm_token

        };


        const result = await admin.messaging().send(message);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json(error);

    }

});

module.exports = router;