const express = require('express');
const mustache = require('mustache-express');
const fs = require('fs');

const server = express();

server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');

server.use(express.static('public'));


fs.readFile('users.json', function(err,content){
  let robots = JSON.parse(content)

  server.get('/', function (req, res) {
    res.render('home',{
      robots: robots.users
    });
  });

})


server.listen(3000, function () {
  console.log('Danger, Will Robinson!')
});
