const express = require('express');
// const { result } = require('lodash');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//express app
const app = express();

const dbURI = 'mongodb+srv://mydatabase:mydatabase123@mycluster.ikqjyes.mongodb.net/';
mongoose.connect(dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//by default ejs look into views
//but you can change this 
//app.set('views', 'myviews');

//app.listen(4000);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'Third Blog...',
//         snippet: 'This is the third blog',
//         body: 'This blog is funny'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blog', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/one-blog', (req, res) => {
//     Blog.findById('654b6cede1ea42575cc95270')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.use((req, res, next) => {
    console.log('New Request Made');
    console.log('Hostname: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});

app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'First Blog', snippet:'This is the First blog.......' },
    //     { title: 'Second Blog', snippet:'This is the Second blog.......' },
    //     { title: 'Third Blog', snippet:'This is the Third blog.......' }
    // ]
    Blog.find().sort( { createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'Home', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });    
});

app.post('/', (req, res) => {
    //console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // console.log("ID: ", id);
    Blog.findById(id)
        .then(result => {
            res.render('details', { title: 'Blog Details', blogs: result})
        })
        .catch(err => {
            console.log(err);   
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // console.log("ID: ", id);
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch(err => {
            console.log(err);   
        });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    next();
})

app.get('/about-us', (req, res) => {
    //res.redirect('about', { title: 'About'});
    res.render('about', { title: 'About Us'});

});

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});