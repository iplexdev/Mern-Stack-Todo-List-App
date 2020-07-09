const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const orderRoute = require('./api/routes')
const port = 4000;


app.use(cors());
app.use(bodyParser.json());

// connect server to mongoos
mongoose.connect(config.DB,{useNewUrlParser: true}).then(
    () => {console.log('Database is connected');
    },
    err => {console.log('can not connected to database '  + err);
    }
)
// router will be add as a middleware and take control of request starting with path "/todos"
app.use('/todos', orderRoute)
app.listen(port,function() {
    console.log('server is running on the port ', port);
})