const express = require('express');
const exphbs  = require('express-handlebars');

const homeRout = require('./routs/home');
const addRout = require('./routs/add');
const cardRout = require('./routs/card');
const coursesRout = require('./routs/courses');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
 
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded( {extended: true} ));
 
app.use('/', homeRout);
app.use('/add', addRout);
app.use('/card', cardRout);
app.use('/courses', coursesRout);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running..');
});