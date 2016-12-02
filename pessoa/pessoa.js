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

        col.findOne({_id: objectId(pessoa._id) },function (err, vcl) {
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

module.exports = router;