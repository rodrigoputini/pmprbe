var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var url = 'mongodb://localhost:27017/pmls'



router.post('/', function (req, res) {
    var menu = req.body;
    var role = menu.role;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var col = db.collection('menu');

        col.find({ 'role': role }).toArray(function (err, docs) {
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

module.exports = router;