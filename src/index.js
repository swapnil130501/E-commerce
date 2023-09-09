const express = require('express');
const connect = require('./config/database');
const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', ApiRoutes);

app.listen(3000, async ()=> {
    console.log('server started');
    await connect();
    console.log('mongo db connected');
});
