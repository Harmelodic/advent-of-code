require("./timer").time();

function processId(boxId) {
    let countChecks = {
        hasATwo: false,
        hasAThree: false
    }

    boxId.split("").forEach(character => {
        let characterCount = (boxId.match(new RegExp(character, "g")) || []).length;
        if (characterCount === 2) {
            countChecks.hasATwo = true;
        }
        if (characterCount === 3) {
            countChecks.hasAThree = true;
        }
    });

    return countChecks;
}

let twos = 0;
let threes = 0;

const readline = require("readline");
const fs = require("fs");

const reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/../inputs/day02")
})

reader.on("line", boxId => {
    let countChecks = processId(boxId);

    countChecks.hasATwo && twos++;
    countChecks.hasAThree && threes++;
})

reader.on("close", () => {
    const checksum = twos * threes;
    console.log(checksum);
})