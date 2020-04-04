const express = require('express');
const routes = require('./routes/routes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

mongoose.connect('mongodb+srv://leandro:leandro@cluster0-ipcwz.mongodb.net/upload_test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    '/files',
    express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads')
    )
);

app.use(routes);

app.listen(3333);