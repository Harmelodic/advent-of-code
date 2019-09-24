const fs = require("fs");

function reduceToDirectPath(stepCount) {
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
}

fs.readFile("./Day11-Input.txt", (err, data) => {
    if (err) throw err;

    const inputPath = data.toString().split(",");

    let stepsAwayFromHome = {
        n: 0,
        ne: 0,
        se: 0,
        s: 0,
        sw: 0,
        nw: 0
    };

    let solution = 0;

    inputPath.forEach(step => {
        stepsAwayFromHome[step]++;
        reduceToDirectPath(stepsAwayFromHome);

        let distance = 0;
        Object.keys(stepsAwayFromHome).forEach(numberOfStepsInDirection => {
            distance += stepsAwayFromHome[numberOfStepsInDirection];
        });

        if (distance > solution) {
            solution = distance;
        }
    });
    
    console.log(solution);
});