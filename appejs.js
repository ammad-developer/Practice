const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//by default ejs look into views
//but you can change this 
//app.set('views', 'myviews');

app.listen(3000);

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('New Request Made');
    console.log('Hostname: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
})

app.get('/', (req, res) => {
    const blogs = [
        { title: 'First Blog', snippet:'This is the First blog.......' },
        { title: 'Second Blog', snippet:'This is the Second blog.......' },
        { title: 'Third Blog', snippet:'This is the Third blog.......' }
    ]
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    next();
})

app.get('/about-us', (req, res) => {
    //res.redirect('about', { title: 'About'});
    res.render('about', { title: 'Create'});

});

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});