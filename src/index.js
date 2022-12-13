//=====================Importing Module and Packages=====================//
const express = require('express');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment = require('moment');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://raj_3028:kWaM507ps0Icsdg0@cluster0.pw23ckf.mongodb.net/URL-Shortner", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is Connected."))
    .catch(error => console.log(error))

//===================== Global Middleware for Console the Date, Time, IP Address and Print the perticular API Route Name when you will hit that API =====================//
app.use(
    function globalMiddleWare(req, res, next) {
        const today = moment();
        const formatted = today.format('YYYY-MM-DD hh:mm:ss');
        console.log("----------------")
        console.log("Date:-", formatted);
        console.log("IP Address:-", req.ip);
        console.log("API Route Info:-", req.originalUrl);
        next()
    }
)

//===================== Global Middleware for All Route =====================//
app.use('/', route)

//===================== It will Handle error When You input Wrong Route =====================//
app.use(function (req, res) {
    var err = new Error("Not Found.")
    err.status = 404
    return res.status(404).send({ status: "404", msg: "Path not Found." })
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express App Running on Port: ' + (process.env.PORT || 3000))
});