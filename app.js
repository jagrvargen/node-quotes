const fetch = require('node-fetch');
const readline = require('readline-sync');

const endpoint = 'https://api.taylor.rest'

let a = Number(readline.question("\nHow many quotes would you love to live by? (max 10) "));

while (a < 1 || a > 10) {
    console.log("Please enter a number from 1 to 10");
    a = Number(readline.question("How many quotes (1-10)?"));
}

console.log();

Promise.all(Array(a).fill(endpoint).map((url, _) =>
    fetch(url).then(resp => resp.json())
    .then(json => console.log(json["quote"]))
    .catch(error => console.log(error))
));
