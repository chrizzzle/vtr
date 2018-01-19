var db = require('../dao/db');
var assert = require('assert');
var config = require('../config');


var startCountdownInterval = function (io, sessionParsed, callback) {
    var number = config.countdownMax;

    sessionParsed.countdown = number;
    io.emit('SESSION_COUNT_DOWN', {
        session: sessionParsed
    });

    number--;
    var interval = setInterval(function () {
        if (number < 0) {
            sessionParsed.active = true;
            io.emit('SESSION_START', {
                session: sessionParsed
            });
            db.updateSession(sessionParsed);
            clearInterval(interval);

            if (callback) {
                callback();
            }

            return;
        }
        sessionParsed.countdown = number;
        io.emit('SESSION_COUNT_DOWN', {
            session: sessionParsed
        });
        number--;
    }, 1000);
};

var startTimerInterval = function (io, sessionParsed, callback) {
    var timerNumber = 0;
    sessionParsed.timer = timerNumber;
    sessionParsed.percent = parseInt((timerNumber/config.timerMax)*100, 10);
    io.emit('SESSION_TIMER', {
        session: sessionParsed
    });
    timerNumber++;

    var timerInterval = setInterval(function () {
        if (timerNumber > config.timerMax) {
            clearInterval(timerInterval);
            if (callback) {
                callback();
            }

            return;
        }
        sessionParsed.timer = timerNumber;
        sessionParsed.percent = parseInt((timerNumber/config.timerMax)*100, 10);
        io.emit('SESSION_TIMER', {
            session: sessionParsed
        });
        timerNumber++;
    }, 1000);
};


var handleVote = function (io, socket, vote) {
    var voteParsed = JSON.parse(vote);

    db.getVotesBySessionAndUser(
        voteParsed.sessionId,
        voteParsed.userId,
        function (err, votes) {
            assert.equal(err, null);
            communicateVote(votes, io, socket, voteParsed);
        });
};


var communicateVote = function (votes, io, socket, voteParsed) {
    var vote;

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
};


module.exports = function (io) {
    io.on('connection', function (socket){
        socket.on('VOTE', function (vote) {
            handleVote(io, socket, vote);
        });
        socket.on('START', function (session) {
            var sessionParsed = JSON.parse(session);
            startCountdownInterval(io, sessionParsed, function () {
                startTimerInterval(io, sessionParsed, function () {
                    io.emit('SESSION_END', {
                        session: sessionParsed
                    });
                });
            });
        });
    });
};
