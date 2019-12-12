#!node
require('../timer').time();

const reader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/inputs/day01')
})

let totalFuelRequired = 0;

reader.on('line', line => {
    const mass = parseInt(line);
    totalFuelRequired += fuelRequired(mass);
})

reader.on('close', () => {
    console.log(`Total Fuel Required: ${totalFuelRequired}`);
})


function fuelRequired(mass) {
    return (Math.floor(mass / 3) - 2)
}