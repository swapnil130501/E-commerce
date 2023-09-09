const express = require('express');
const connect = require('./config/database');
const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const passport = require('passport');
const {passportAuth} = require('./config/jwt-middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', ApiRoutes);

app.listen(3000, async ()=> {
    console.log('server started');
    await connect();
    console.log('mongo db connected');
});
