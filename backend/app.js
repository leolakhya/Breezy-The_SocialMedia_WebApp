const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: 'backend/config/config.env'})
}

//using middleware to parse the body of the request
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}))
app.use(cookieParser())

//Enabling Cors
app.use(cors())
app.options('*', cors());
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);


//Import routes
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.router')
const followRoutes = require('./routes/followAndUnfollowRoutes')
const chatRoutes = require('./routes/chatRouter')
const messageRoutes = require('./routes/messageRoutes')


//use routes

app.use('/api/v1/', userRoutes)
app.use(`/api/v1/`, followRoutes)
app.use(`/api/v1/`, postRoutes)


//chat routes
app.use("/api/v1/chat", chatRoutes)
app.use("/api/v1/message", messageRoutes)

//error handlers
const {notFound, errorHandler} = require("./middleware/errorMiddleware");

app.use(notFound)
app.use(errorHandler)

module.exports = app