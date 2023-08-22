"use strict";

const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;
const { STATUS_CODES } = http
const url = require("url");


const hello = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
   </style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.method !== "GET") {
        res.statusCode = 405;
        res.end(STATUS_CODES[res.statusCode] + "\r\n");
        return;
    }
    const {pathname} = url.parse(req.url);

    switch (pathname){
        case "/":
            res.end(root);
            break;
        case "/hello":
            res.end(hello);
            break;
        default:
            res.statusCode = 404;
            res.end(STATUS_CODES[res.statusCode] + "\r\n");
    }

});

server.listen(PORT, () => {
    console.log('server has started');
});



