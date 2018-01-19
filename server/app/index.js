var express = require('express');
var db = require('./dao/db');
var router = express.Router();
var assert = require('assert');

router.get('/session-create', function (req, res, next) {
    db.insertMany('sessions', [{
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }, {
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }, {
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    },{
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }, {
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }, {
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }, {
        name : 'Session ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        timer: 0,
        percent: 0,
        countdown: null,
        active: false
    }], function (err) {
        assert.equal(err, null);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));

        db.findAll('sessions', function (err2, docs) {
            assert.equal(err2, null);

            docs.forEach(function (session) {
                db.insertMany('options', [{
                    name: 'Option ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    sessionId: session._id,
                    votes: 0
                }, {
                    name: 'Option ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    sessionId: session._id,
                    votes: 0
                }, {
                    name: 'Option ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    sessionId: session._id,
                    votes: 0
                }], function (err3) {
                    assert.equal(err3, null);
                });
            });
        });
    });
});

router.options('/session', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('');
});

router.get('/session', function (req, res, next) {
    db.findAll('sessions', function (err, docs) {
        assert.equal(err, null);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(docs));
    });
});

router.get('/session-delete', function (req, res, next) {
    db.deleteAll('sessions', function (err) {
        assert.equal(err, null);
        db.deleteAll('options', function (err) {
            assert.equal(err, null);
            db.deleteAll('votes', function (err) {
                assert.equal(err, null);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    success: true
                }));
            });
        });
    });
});


router.options('/option', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('');
});

router.get('/option', function (req, res, next) {
    db.findAll('options', function (err, docs) {
        assert.equal(err, null);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(docs));
    });
});

router.options('/vote', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('');
});

router.get('/vote', function (req, res, next) {
    db.findAll('votes', function (err, docs) {
        assert.equal(err, null);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(docs));
    });
});

module.exports = router;
