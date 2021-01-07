const express = require('express');
const app = express();

// connection
const port = process.env.PORT || 8082;

//middleware
require('dotenv').config();

// const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
app.use('public/upload', express.static('public/upload'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());
app.use('*', cors());

// routes
const router = require('./src/routes/contactRouter');
const api = process.env.API_URL;
app.use(`${api}/contact`, router)

//connection database
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'contact-database'
})
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log('Listening to the port : ' + port)
});
