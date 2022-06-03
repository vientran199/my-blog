require('dotenv').config();
const path = require('path');
const express = require('express');
// const morgan = require("morgan");
const cors = require('cors');
const { engine } = require('express-handlebars');
const app = express();
const port = 5000;
const db = require('./config/db');

const route = require('./routes');
//Để cho có thể được được dữ liệu json được guiử lên
app.use(express.json());
app.use(cors());
// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
// app.use(morgan('combined'))

// remplate engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Route
route(app);

//Connect DB
db.connect(app, port);
