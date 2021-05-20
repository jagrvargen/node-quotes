const request = require('request');
const readline = require('readline-sync');

let a = Number(readline.question("How many quotes (1-10)?"));

if (a > 10) {
    a = 10;
}

for (let i = 0; i < a; i++) {
    request('https://api.taylor.rest/', function (error, response, body) {
        console.log('Quote:', JSON.parse(body)["quote"], "\n");
    });
}
