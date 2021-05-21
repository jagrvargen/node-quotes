const axios = require('axios').default;
const querystring = require('querystring');

const url = 'https://icanhazdadjoke.com/';

const jokes = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'Practice (https://github.com/jagrvargen/node-quotes)'
    }
});

function getJoke(searchTerm) {
    if (!searchTerm || searchTerm === "") {
        return jokes();
    }
    return jokes(url + 'search?' + querystring.stringify({term: searchTerm}));
}

module.exports = function returnResponse(searchTerm) {
    return new Promise(function (resolve, reject) {
        let jokeJSON = getJoke(searchTerm)
        resolve(jokeJSON)
        reject("error")
    })
}
