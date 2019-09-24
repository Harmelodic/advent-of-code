require("./timer").time();

const readline = require("readline");
const fs = require("fs");

// Seed frequency
let frequency = 0;
let resultFound = false;

const frequenciesThatHaveBeenSeen = [];
frequenciesThatHaveBeenSeen.push(frequency);

// Open file
let reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/../inputs/day01")
})

function processFile() {
    reader.on("line", line => {
        const modifier = parseInt(line);
        frequency += modifier;
    
        if (frequenciesThatHaveBeenSeen.includes(frequency)) {
            resultFound = true;
            reader.close();
        }
        else {
            frequenciesThatHaveBeenSeen.push(frequency);
        }
    })

    reader.on("close", () => {
        if (resultFound) {
            console.log(frequency);
        }
        else {
            reader = readline.createInterface({
                input: fs.createReadStream(__dirname + "/../inputs/day01")
            })
            processFile();
        }
    })
}

processFile();