const myInput = 386;

let fifyBillionArray = [...Array(50000001).keys()];
fifyBillionArray.shift();

let i = 0;
let elementsInPositionOne = [];

fifyBillionArray.forEach(element => {
    i = (i + myInput) % element + 1;

    if (i === 1) {
        elementsInPositionOne.push(element);
    }
})

let solution = elementsInPositionOne[elementsInPositionOne.length - 1];

console.log(solution);
