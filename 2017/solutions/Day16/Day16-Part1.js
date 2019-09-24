const fs = require("fs");

const programs = "abcdefghijklmnop";

let lineOfPrograms = programs.split("");

function spin(numberOfProgramsToMove) {
    let arrayOfPrograms = [];
    for (let i = 0; i < numberOfProgramsToMove; i++) {
        arrayOfPrograms.push(lineOfPrograms.pop());
    }
    arrayOfPrograms.reverse();
    lineOfPrograms = arrayOfPrograms.concat(lineOfPrograms);
}

function exchange(positionA, positionB) {
    let programA = lineOfPrograms[positionA];
    let programB = lineOfPrograms[positionB];

    lineOfPrograms[positionA] = programB;
    lineOfPrograms[positionB] = programA;
}

function partner(programA, programB) {
    let indexOfA = lineOfPrograms.indexOf(programA);
    let indexOfB = lineOfPrograms.indexOf(programB);
    lineOfPrograms[indexOfA] = programB;
    lineOfPrograms[indexOfB] = programA;
}

fs.readFile("./Day16-Input.txt", (err, data) => {
    if (err) throw err;

    data.toString().split(",").forEach(move => {
        switch (move[0]) {
            case "s":
                let numberToMove = parseInt(move.substr(1));
                spin(numberToMove);
                break;
            case "x":
                let positionA = parseInt(move.substring(1, move.indexOf("/")));
                let positionB = parseInt(move.substring(move.indexOf("/") + 1));
                exchange(positionA, positionB);
                break;
            case "p":
                let programA = move[1];
                let programB = move[3];
                partner(programA, programB);
                break;
            default:
                break;
        }
    });

    console.log(lineOfPrograms.join(""));
});
