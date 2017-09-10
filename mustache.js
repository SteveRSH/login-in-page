
// const static = require('serve-static');
const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyparser = require('body-parser');
const server = express();

const users = [
     { username: 'baseball', password: 'yankees', logins: 0 },
    { username: 'city', password: 'charlotte', logins: 0 },
    { username: 'help', password: 'desk', logins: 0 },
];

// https://stackoverflow.com/questions/29717559/javascript-count-how-many-time-a-button-is-pressedfunction

let countClicks = 0;

server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(bodyparser.urlencoded({
  extended: false
}));


server.use(session({
   secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));



server.post('/reGistration',function(req, res){
  res.render('signup');
})
server.post('/signup', function(req, res){
  const if_this_user = req.body.username;
  const if_this_password = req.body.password;
  users.push({
    username: if_this_user,
    password: if_this_password,

  });
  res.render('login',{
    totalClicks: countClicks,
  });
});

server.post('/upCount', function(req, res) {
  countClicks++;
  res.render('login', {
    totalClicks: countClicks,
  });
});

server.post('/login', function(req, res) {
  const user_login = req.body.username;
  const user_password = req.body.password;

  let signee = null;

  for (let i = 0; i < users.length; i++) {
    if (user_login === users[i].username &&
      user_password === users[i].password) {
      signee = users[i];
    }
  }
  if (signee !== null) {
    req.session.who = signee;
    res.redirect('/home');
  } else {
    res.redirect('/');
  }
});

server.get('/home', function(req, res) {
  if (req.session.who !== undefined) {
    res.render('home', {
      username: req.session.who.username,
    });
  } else {
    res.redirect('/');
  }
});

server.get('/', function(req, res) {
  const totalClicks = countClicks;

  res.render('login',{
    totalClicks: countClicks,
  });
});

server.post('/log_Out', function(req, res) {
  req.session.destroy(function(){
    res.render('login', {
      totalClicks: countClicks,
    });
  });
});

server.listen(3010, function(req, res){
  console.log("GOING FOR A RUN");
});
