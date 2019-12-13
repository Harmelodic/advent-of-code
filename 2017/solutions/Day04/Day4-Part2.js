const fs = require("fs");

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

fs.readFile("./Day4-Input.txt", (err, data) => {
    if (err) throw err;
    let phrases = data.toString().split("\n").map(phrase => phrase.split(" ").map(word => word.split("").sort().join("")));

    let phrasesValid = 0;

    phrases.forEach(phrase => {
        if (!hasDuplicates(phrase)) {
            phrasesValid++;
        }
    });

    console.log(phrasesValid);
});