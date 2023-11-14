const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log('Request Made');
    console.log('Request URL: ', req.url);
    console.log('Request Method: ', req.method);

    //1
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello, Ammad');
    // res.end();

    //2
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<head><link rel="styleseet" href="#"></link></head>');
    // res.write('<p>Hello Ammad</p>');
    // res.write('<p>Hello Again Ammad</p>');
    // res.end();

    //3
    //set header content type
    // res.setHeader('Content-Type', 'text/html');
    // //send an html file
    // fs.readFile('./views/index.html', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         //res.write(data);
    //         res.end(data);
    //     }
    // });

    //4
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/home':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    //set header content type
    res.setHeader('Content-Type', 'text/html');
    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //res.write(data);
            res.end(data);
        }
    });

    //Status Code
    //200 - OK
    //301 - Resource moved
    //404 - Not Found
    //500 - Internal Server Error

    //Status Code Range
    //100 Range - Informational Responses
    //200 Range - Success Code
    //300 Range - Code for redirects
    //400 Range - User or Client Error Codes
    //500 Range - Server Error Codes

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello Once');
    });

    const great = () => {
        console.log('Hello Again and Again');
    };

    greet();
    greet();
    great();
    great();




});

server.listen(4000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});