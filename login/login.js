var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var url = 'mongodb://localhost:27017/pmls'


// middleware that is specific to this router
router.use(function loginControl(req, res, next) {
  next();
});


// define the home page route
router.post('/', function(req, res) {
    var user =   req.body;
    var username = user.username;
    var password = user.password;

 MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  //console.log("Connected correctly to server");

  var col = db.collection('pmlsUsers');
  
  col.findOne({'username':username,'password':password}, function (err, docs) {
        if(err){
          db.close();
          res.status(500);
        }
        if(docs){
            db.close();
            res.json(docs);
        }
        else{
          db.close();
          res.status(500);
        }
        
    });
});
});

module.exports = router;