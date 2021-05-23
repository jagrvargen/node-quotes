const axios = require('axios').default;
const querystring = require('querystring');
const emitter = require('events').EventEmitter;
const fs = require('fs');
const fsPromises = require('fs/promises');

const url = 'https://icanhazdadjoke.com/';
const filename = './jokes.txt'

const ee = new emitter();

function randInt(max) {
    return Math.floor(Math.random() * max);
}

var joke;

ee.on('validateResponse', (response) => {
    const jokes = response.data.results
    if (!jokes || !jokes.length) {
        throw new Error("No joke found");
    }
    joke = jokes[randInt(jokes.length)].joke
    ee.emit('saveJoke', joke)
})

ee.on('saveJoke', (joke) => {
    fs.appendFile(filename, joke.trim().replace(/\r?\n|\r/g, " ") + "\n", (err) => {
        if (err) {
            console.log(err)
            throw err;
        } else {
            console.log('Reading file')
            fs.readFileSync(filename, 'utf8')
        }
        console.log(joke)
    });
})

ee.on('findLeader', () => {
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
        console.log(`leader is ${leader}`)
    })
    .catch(err => {
        return "Unable to read jokes.txt"
    })
})

const jokes = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'Practice (https://github.com/jagrvargen/node-quotes)'
    }
});

var response;

ee.on('getJoke', (searchTerm) => {
    if (!searchTerm || searchTerm === "") {
        response = jokes();
    }
    response = jokes(url + 'search?' + querystring.stringify({term: searchTerm}));
})

ee.on('returnResponse', (searchTerm) => {
    ee.emit('getJoke', searchTerm)
    response.then(resp => {
        ee.emit('validateResponse', resp);
    }).catch(err => console.log(err))
    return joke;
})

module.exports = ee
