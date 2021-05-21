const returnResponse = require('./routes/get-jokes');
const process = require('process');
const fs = require('fs');

const filename = './jokes.txt'

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function validateResponse(response) {
    let jokes = response.data.results
    if (typeof jokes === 'undefined' || jokes === null ||  jokes.length === 0) {
        throw new Error("No joke found");
    }
    return jokes[randInt(jokes.length)].joke
}

function saveJoke(joke) {
    fs.appendFile(filename, joke, (err) => {
        if (err) {
            throw err;
        }
        console.log(joke)
    });
}

if (!process.argv[2]) {
    let prompt = require('prompt');

    prompt.start();

    prompt.get(['category'], function (err, result) {
        Promise.resolve(returnResponse(result.category))
        .then(resp => validateResponse(resp))
        .then(joke => saveJoke(joke))
        .catch(error => console.log(error))
    });
} else {
    const searchTerm = process.argv[2]
    Promise.resolve(returnResponse(searchTerm))
        .then(resp => validateResponse(resp))
        .then(joke => saveJoke(joke))
        .catch(error => console.log(error))
}
