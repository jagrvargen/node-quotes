const ee = require('./routes/get-jokes');
const process = require('process');

if (!process.argv[2]) {
    let prompt = require('prompt');

    prompt.start();

    prompt.get(['category', 'leaderboard'], function (err, result) {
        ee.emit('returnResponse', result.category)

        if (result.leaderboard) {
            ee.emit('findLeader')
        }
    });
} else {
    const searchTerm = process.argv[2]
    ee.emit('returnResponse', searchTerm);
    if (process.argv[3] && process.argv[3] === "leader") {
        ee.emit('findLeader')
    }
}
