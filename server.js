var express = require('express')
var cors = require('express')
var dotenv = require('dotenv')
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');
const app = express();
var userRoute = require('./routes/user')
var NotesRoute = require('./routes/notes')
var ConversationRoute = require('./routes/conversation')
var NotificationRoute = require('./routes/notification')
var messageRoute = require('./routes/message')
var quizRoute = require('./routes/questions')
var typeRoute = require('./routes/types')
var instiRoute = require('./routes/instituition')
var levelRoute = require('./routes/level')
var areaRoute = require('./routes/area')
var blogRoute = require('./routes/blog')
var commentRoute = require('./routes/comments')
var Chats = require('./ioControllers/chats')
app.use(morgan('tiny'));
app.use(cors())
var http = require('http').createServer(app)


require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// db connection
let mongo_options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };
// Connecting To DB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', mongo_options);
let db = mongoose.connection;
db.on('error', function (error) {
    console.log('Error while connecting to mongodb database:', error);
});
db.once('open', function () {
    console.log(`Successfully connected to ${process.env.MONGODB_URL}`);
});
db.on('disconnected', function () {
    // //Reconnect on timeout
    mongoose.connect(process.env.DB_CONNECT, mongo_options);
    db = mongoose.connection;
});

const PORT = process.env.PORT || 9080;
app.get("/", (req, res) => {
    res.send("Welcome to your App!")
})

app.use('/api', userRoute);
app.use('/api', quizRoute);
app.use("/api", ConversationRoute);
app.use("/api", messageRoute);
app.use("/api", NotesRoute);
app.use("/api", typeRoute);
app.use("/api", instiRoute);
app.use("/api", levelRoute);
app.use("/api", areaRoute);
app.use("/api", blogRoute);
app.use("/api", commentRoute);
app.use("/api/fcm/", NotificationRoute);


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'client/build')));

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
// app.get("*", (req, res) => {
//   res.sendFile('index.html', { root });
// })
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
});

// app.get("*", (req, res) => {
//     res.sendFile('index.html', { root });
// })

http.listen(PORT, () => {
    console.log(`Serve at http://localhost:${PORT}`);
});

Chats(http)