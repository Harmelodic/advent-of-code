#!/usr/local/bin/node
require("../timer").time();

const readline = require("readline");
const fs = require("fs");

const reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/inputs/day01")
})

let totalFuelRequired = 0;

reader.on("line", line => {
    const mass = parseInt(line);
    totalFuelRequired += fuelRequired(mass);
})

reader.on("close", () => {
    console.log(`Total Fuel Required: ${totalFuelRequired}`);
})


function fuelRequired(mass) {
    return (Math.floor(mass / 3) - 2)
}