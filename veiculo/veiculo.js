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

        var col = db.collection('pmlsVeiculo');

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

router.post('/placa', function (req, res) {
    var veiculo = req.body;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var col = db.collection('pmlsVeiculo');

        col.find({'placa': {'$regex':veiculo.placa } }).toArray(function (err, docs) {
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

router.post('/id', function (req, res) {
    var veiculo = req.body;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var col = db.collection('pmlsVeiculo');

        col.findOne({_id: objectId(veiculo._id) },function (err, vcl) {
            if (err) {
                db.close();
                res.status(500);
            }
            if (vcl) {
                db.close();
                res.json(vcl);
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
    var vcl =   req.body;
    var id = vcl._id;
    if(id){
        delete vcl._id;
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsVeiculo');
        col.update({ _id : objectId(id)},
          {$set:vcl}, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

//update a document
router.post('/insert', function (req, res) {
    var vcl =   req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsVeiculo');
        col.insertOne(vcl, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

module.exports = router;