const fs = require("fs");

function stepCountOfPath(path) {
    let count = {
        n: 0,
        ne: 0,
        se: 0,
        s: 0,
        sw: 0,
        nw: 0
    };
    path.forEach(element => {
        count[element] += 1;
    });
    return count;
}

function smallestObjectIn(object) {
    let keys = Object.keys(object);
    let smallest = {};
    smallest.value = object[keys[0]];

    keys.forEach(key => {
        if (smallest.value > object[key]) {
            smallest.value = object[key];
            smallest.key = key;
        }
    });

    return smallest;
}

fs.readFile("./Day11-Input.txt", (err, data) => {
    if (err) throw err;

    const inputPath = data.toString().split(",");

    let stepCount = stepCountOfPath(inputPath);

    const opposites = [
        ["n", "s"],
        ["ne", "sw"],
        ["se", "nw"]
    ];

    opposites.forEach(opposite => {
        if (stepCount[opposite[0]] >= stepCount[opposite[1]]) {
            stepCount[opposite[0]] = stepCount[opposite[0]] - stepCount[opposite[1]];
            stepCount[opposite[1]] = 0;
        }
        else {
            stepCount[opposite[1]] = stepCount[opposite[1]] - stepCount[opposite[0]];
            stepCount[opposite[0]] = 0;
        }
    });

    const pairsAndResults = [
        ["ne", "nw", "n"],
        ["se", "n", "ne"],
        ["s", "ne", "se"],
        ["sw", "se", "s"],
        ["nw", "s", "sw"],
        ["n", "sw", "nw"]
    ];

    pairsAndResults.forEach(pairAndResult => {
        while (stepCount[pairAndResult[0]] > 0 && stepCount[pairAndResult[1]] > 0) {
            stepCount[pairAndResult[0]]--;
            stepCount[pairAndResult[1]]--;
            stepCount[pairAndResult[2]]++;
        }
    });

    let solution = 0;

    Object.keys(stepCount).forEach(numberOfStepsInDirection => {
        solution += stepCount[numberOfStepsInDirection];
    })

    console.log(solution);
});