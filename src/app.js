const returnResponse = require('./routes/get-jokes');
const process = require('process');
const fs = require('fs');
const fsPromises = require('fs/promises');

const filename = './jokes.txt'

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function validateResponse(response) {
    const jokes = response.data.results
    if (!jokes || !jokes.length) {
        throw new Error("No joke found");
    }
    return jokes[randInt(jokes.length)].joke
}

function saveJoke(joke) {
    fs.appendFile(filename, joke.trim().replace(/\r?\n|\r/g, " ") + "\n", (err) => {
        if (err) {
            throw err;
        }
        console.log(joke)
    });
}

function findLeader() {
    return fsPromises.readFile(filename, encoding='utf8')
    .then(data => {
        let leaders = {}
        data = data.replace(/^\s*\n/gm, "").split("\n");
        data.forEach(line => {
            if (!(line in leaders)) {
                leaders[line] = 1;
            } else {
                leaders[line] += 1;
            }
        })
        let max = 0;
        Object.entries(leaders).forEach(entry => {
            let joke = entry[0];
            let count = entry[1];
            if (count > max) {
                max = count;
                leader = joke;
            }
        })
        return leader;
    })
    .catch(err => {
        return "Unable to read jokes.txt"
    })
}

if (!process.argv[2]) {
    let prompt = require('prompt');

    prompt.start();

    prompt.get(['category', 'leaderboard'], function (err, result) {
        Promise.resolve(returnResponse(result.category))
        .then(resp => validateResponse(resp))
        .then(joke => saveJoke(joke))
        .catch(error => console.log(error))

        if (result.leaderboard) {
            findLeader()
            .then(leader => console.log(`Most popular joke is ${leader}`))
            .catch(err => console.log(err));
        }
    });
} else {
    const searchTerm = process.argv[2]
    returnResponse(searchTerm)
        .then(resp => validateResponse(resp))
        .then(joke => saveJoke(joke))
        .catch(error => console.log(error))
}
