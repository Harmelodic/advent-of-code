#!node
require('../timer').time();

const reader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/inputs/day01')
})

let totalFuelRequired = 0;

reader.on('line', line => {
    const mass = parseInt(line);
    recursivelyCalculateTotalFuelRequiredForMass(mass);
})

reader.on('close', () => {
    console.log(`Total Fuel Required: ${totalFuelRequired}`);
})


function recursivelyCalculateTotalFuelRequiredForMass(mass) {
    let proposedFuelRequired = fuelRequired(mass);
    totalFuelRequired += proposedFuelRequired;
    if (proposedFuelRequired > 0) {
        recursivelyCalculateTotalFuelRequiredForMass(proposedFuelRequired);
    }
}


function fuelRequired(mass) {
    let proposedFuel = (Math.floor(mass / 3) - 2);
    if (proposedFuel <= 0) {
        return 0;
    }
    else {
        return proposedFuel;
    }
}