var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var url = 'mongodb://localhost:27017/pmls'



router.post('/', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var col = db.collection('pmlsUsers');

        col.find({}).toArray(function (err, docs) {
            if (err) {
                db.close();
                res.status(500);
            }
            if (docs) {
                db.close();
                res.json(docs);
            }
            else {
                db.close();
                res.status(500);
            }

        });
    });
});

//update a document
router.post('/update', function (req, res) {
    var user =   req.body;
    var id = user._id;
    if(id){
        delete user._id;
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsUsers');
        col.update({ _id : objectId(id)},
          {$set:user}, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

//update a document
router.post('/insert', function (req, res) {
    var user =   req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsUsers');
        col.insertOne(user, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

module.exports = router;