const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');

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
// console.log(path.join(__dirname,'resources\\views'))

//Route
route(app);

app.listen(port, () => console.log(`App is running on port ${port}`));
