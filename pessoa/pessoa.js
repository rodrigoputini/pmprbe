var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var url = 'mongodb://localhost:27017/pmls'

router.post('/nome', function (req, res) {
    var pessoa = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'nome': {'$regex':pessoa.nome } }).toArray(function (err, docs) {
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

router.post('/cpf', function (req, res) {
    var pessoa = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'cpf': pessoa.cpf }).toArray(function (err, docs) {
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

router.post('/rg', function (req, res) {
    var pessoa = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'rg': pessoa.rg }).toArray(function (err, docs) {
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

router.post('/apelido', function (req, res) {
    var pessoa = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'apelido': {'$regex':pessoa.apelido } }).toArray(function (err, docs) {
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

router.post('/cidade', function (req, res) {
    var endereco = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'endereco.cidade': {'$regex':endereco.cidade } }).toArray(function (err, docs) {
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

router.post('/artigo', function (req, res) {
    var artigo = req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.find({'artigo.numero': artigo.numero }).toArray(function (err, docs) {
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
    var pessoa = req.body;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var col = db.collection('pmlsSuspeitos');

        col.findOne({'_id': objectId(pessoa._id) },function (err, pes) {
            if (err) {
                db.close();
                res.status(500);
            }
            if (pes) {
                db.close();
                res.json(pes);
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
    var pessoa =   req.body;
    var id = pessoa._id;
    if(id){
        delete pessoa._id;
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.update({ _id : objectId(id)},
          {$set:pessoa}, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

//insert a document
router.post('/insert', function (req, res) {
    var pessoa =   req.body;
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var col = db.collection('pmlsSuspeitos');
        col.insertOne(pessoa, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          db.close();
          res.send("ok");
        });
    });
});

module.exports = router;