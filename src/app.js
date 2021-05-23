const ee = require('./routes/get-jokes');
const process = require('process');

if (!process.argv[2]) {
    let prompt = require('prompt');

    const schema = {
        properties: {
            category: {},
            leaderboard: {
                message: 'Would you like to see the most popular joke? (y/n)'
            }
        }
    }

    prompt.start();

    prompt.get(schema, function (err, result) {
        ee.emit('returnResponse', result.category)
        const leader = result.leaderboard.trim().toLowerCase()
        if (leader === "y" || leader === "yes") {
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
