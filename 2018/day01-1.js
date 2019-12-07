require("../timer").time();

const readline = require("readline");
const fs = require("fs");

const reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/inputs/day01")
})

// Seed frequency
let frequency = 0;

reader.on("line", line => {
    const modifier = parseInt(line);
    frequency += modifier;
})

reader.on("close", () => {
    console.log(frequency);
})