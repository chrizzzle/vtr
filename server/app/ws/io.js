var db = require('../dao/db');
var assert = require('assert');
var config = require('../config');


module.exports = function (io) {
    io.on('connection', function(socket){
        socket.on('VOTE', function(vote){
            var voteParsed = JSON.parse(vote);

            db.getVotesBySessionAndUser(
                voteParsed.sessionId,
                voteParsed.userId,
                function (err, votes) {
                    var vote;
                    assert.equal(err, null);

                    if (votes && (votes.length >= config.maxVotes)) {
                        // voting not allowed. send error response
                        io.to(socket.id).emit('VOTE_LIMIT');
                        return;
                    }

                    vote = {
                        optionId: voteParsed.optionId,
                        sessionId: voteParsed.sessionId,
                        userId: voteParsed.userId
                    };

                    db.insertVote(vote, function () {
                        io.emit('VOTE', JSON.stringify(vote));
                    });
            });
        });

        socket.on('START', function(session) {
            console.log('SESSION', session);
            var sessionParsed = JSON.parse(session);
            var number = 5;
            io.emit('COUNT_DOWN', {
                number: number,
                session: sessionParsed
            });

            number--;
            var interval = setInterval(function () {
                if (number <= 0) {
                    io.emit('COUNT_DOWN_END');
                    clearInterval(interval);
                }
                io.emit('COUNT_DOWN', {
                    number: number,
                    session: sessionParsed
                });
                number--;
            }, 1000);
        });
    });
};
