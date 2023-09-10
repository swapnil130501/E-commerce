const express = require('express');
const connect = require('./config/database');
const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server-config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', ApiRoutes);

app.listen(PORT, async ()=> {
    console.log(`server started on port: ${PORT}`);
    await connect();
    console.log('mongo db connected');
});
