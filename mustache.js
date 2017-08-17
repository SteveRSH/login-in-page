const mustacheExpress = require('mustache-express');
const express = require('express');
const fs = require('fs');
const app = express();
const bodyparser = require('body-parser');
const server = express();

const users = [
     { username: 'baseball', password: 'yankees', logins: 0 },
    { username: 'city', password: 'charlotte', logins: 0 },
    { username: 'help', password: 'desk', logins: 0 },
];

//Test to make sure user name matches password
// for (let i = 0; i < users.length; i++) {
//      if (username === users[i].username &&
//     password === users[i].password) {
//     user = users[i];
//   }};


server.use(bodyparser.urlencoded({
  extended: false
}));
server.engine('mustache', mustacheExpress());
server.set('views', './views')
server.set('view engine', 'mustache')
//don't need the below because I don't have a public folder
server.use(express.static("public"))

server.get("/", function (req, res) {
  res.render('login');
  });

  server.get('/home', function (request, response) {
  response.render('home');
});

//user name count

// server.get('/home', function (request, response) {
//     if (request.session.work !== undefined) {
//         response.render('home'), {
//            username: request.session.work.username,
//            loginCount: request.session.work.logins,
//            messages: messages,
//        });




server.listen(3003, function () {
  console.log('Learn to code and be amazing and creative')
});
