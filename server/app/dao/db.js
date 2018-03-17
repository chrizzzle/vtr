var config = require('../config');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var assert = require('assert');

var db = {
    findAll: function (collectionName, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var collection = db.collection(collectionName);

            collection.find({}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(null, docs);
                client.close();
            });
        });
    },
    insertMany: function (collectionName, entities, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var collection = db.collection(collectionName);

            collection.insertMany(entities,
                function(err, result) {
                    assert.equal(err, null);
                    client.close();
                    if (callback) {
                        callback(null);
                    }
            });
        });
    },
    deleteAll: function (collectionName, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var collection = db.collection(collectionName);

            collection.deleteMany({}, function(err, result) {
                client.close();
                if (callback) {
                    callback(null);
                }
            });
        });
    },
    insertVote: function (vote, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var voteCollection = db.collection('votes');

            voteCollection.insertOne(
                vote,
                {},
                function () {
                    client.close();
                    callback();
                }
            );
        });
    },

    getById: function (collection, id, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var sessionCollection = db.collection(collection);

            sessionCollection.findOne({
                _id: id
            }).toArray(function (err, doc) {
                assert.equal(err, null);
                callback(null, doc);
                client.close();
            });
        });
    },

    updateSession: function (session, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var sessionCollection = db.collection('session');

            sessionCollection.updateOne({
                    _id: session._id
                }, {
                    '$set': {
                        name: session.name,
                        active: session.active,
                        timer: session.timer,
                        countdown: session.countdown
                    }
                },
                function () {
                    client.close();

                    if (callback) {
                        callback();
                    }
                }
            );
        });
    },
    getVotesBySessionAndUser: function (sessionId, userId, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var voteCollection = db.collection('votes');

            voteCollection.find({
                sessionId: sessionId,
                userId: userId
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                client.close();
                callback(null, docs);
            });
        });
    }
};

module.exports = db;
