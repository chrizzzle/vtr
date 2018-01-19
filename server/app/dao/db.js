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
            });

            client.close();
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
                    if (callback) {
                        callback(null);
                    }
            });

            client.close();
        });
    },
    deleteAll: function (collectionName, callback) {
        MongoClient.connect(config.db.url, function (err, client) {
            assert.equal(err, null);
            var db = client.db(config.db.name);
            var collection = db.collection(collectionName);

            collection.deleteMany({}, function(err, result) {
                if (callback) {
                    callback(null);
                }
            });

            client.close();
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
                callback
            );

            client.close();
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
                callback(null, docs);
            });

            client.close();
        });
    }
};

module.exports = db;
