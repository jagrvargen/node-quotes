const axios = require('axios').default;

module.exports = function getQuote(url) {
    return axios(url);
}

