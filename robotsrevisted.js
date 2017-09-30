const express = require('express');
const mustache = require('mustache-express');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient

const server = express();

server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');

server.use(express.static('public'));




MongoClient.connect('mongodb://localhost:27017/robots', function(err, db) {
    console.log("Connected correctly to server");
    let roboCop = db.collection("items")
    
   
    server.get('/', function (req, res) {
      roboCop.find().toArray().then(function(list){
        res.render('home',{
          robots: list
        });
      })
    });

    server.get('/looking', function (req, res) {
      roboCop.find({ job : null}).toArray().then(function(list){
        res.render('home',{
          robots: list
        });
      })
    });

    server.get('/good', function (req, res) {
      roboCop.find({ job : { $ne: null } }).toArray().then(function(list){
        res.render('home',{
          robots: list
        });
      })
    });

    // db.close();
  });
  

// fs.readFile('users.json', function(err,content){
//   let robots = JSON.parse(content)



// })


server.listen(3000, function () {
  console.log('More Danger, Will Robinson!')
});
