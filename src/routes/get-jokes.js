const axios = require('axios').default;
const querystring = require('querystring');

const url = 'https://icanhazdadjoke.com/';

const jokes = axios.create({
    baseURL: url,
    headers: {'Accept': 'application/json'}
});

module.exports = function getJoke(searchTerm) {
    if (!searchTerm || searchTerm === "") {
        return jokes();
    }
    return jokes(url + 'search?' + querystring.stringify({term: searchTerm}));
}
