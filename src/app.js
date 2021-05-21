const getJoke = require('./routes/get-jokes');
const process = require('process');

if (!process.argv[2]) {
    let prompt = require('prompt');

    prompt.start();

    prompt.get(['category'], function (err, result) {
        Promise.resolve(getJoke(result.category))
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error))
    });
} else {
    const searchTerm = process.argv[2]
    Promise.resolve(getJoke(searchTerm))
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error))
}
