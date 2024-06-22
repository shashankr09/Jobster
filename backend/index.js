const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const jobRoutes = require('./routes/jobRoutes');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoConnect = require('./utils/database').mongoConnect;
const cors = require('cors');
require('dotenv').config()


const PORT = 8080;

app.use(bodyParser.json()) // app/json

app.use((cors({
    origin: '*',
    methods: '*'
})))

app.use('/user', loginRoutes);

app.use((req, res, next) => {   //jwt token implementation
    try {
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, process.env.SECREAT);
        req.userEmail = result.email;
        next();
    }
    catch {
        return res.status(401).json({
            'message': 'An unAuthorized call'
        })
    }
})

app.use('/job', jobRoutes);

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log("Server Successfully Started")
    });
})

