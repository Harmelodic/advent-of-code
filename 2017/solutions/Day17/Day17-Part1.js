const myInput = 386;

let currentPosition = 0;

let circularArray = [0];

for (let i = 1; i <= 2017; i++) {
    currentPosition = ((myInput + currentPosition) % circularArray.length) + 1;
    circularArray.splice(currentPosition, 0, i);
}

let solution;

if (circularArray.indexOf(2017) === circularArray.length - 1) {
    solution = circularArray[0];
}
else {
    solution = circularArray[circularArray.indexOf(2017) + 1]
}

console.log(solution);