const myInput = "14	0	15	12	11	11	3	5	1	6	8	4	9	1	8	4";

const myInputAsArray = myInput.split("\t").map(number => parseInt(number));

var iterationsThatHaveBeenBefore = [];

function arraysMatch(array, iteration) {
    for (let i = 0; i < iteration.length; i++) {
        if (iteration[i] !== array[i]) {
            return false;
        }
    }

    return true;
}

function arrayHasExistedBefore(array){
    for (let i = 0; i < iterationsThatHaveBeenBefore.length; i++) {
        const iteration = iterationsThatHaveBeenBefore[i];
        if (arraysMatch(array, iteration)) {
            return true;
        }
    }

    iterationsThatHaveBeenBefore.push(array.slice());
    return false;
}

function indexOfHighestValueIn(array){
    highestValueIndex = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element > array[highestValueIndex]) {
            highestValueIndex = i;
        }
    }

    return highestValueIndex;
}

var memoryBank = myInputAsArray;
var cycles = 0;

while (!arrayHasExistedBefore(memoryBank)) {

    var indexOfHighestValue = indexOfHighestValueIn(memoryBank);
    var blocksLeftToDistribute = memoryBank[indexOfHighestValue];
    memoryBank[indexOfHighestValue] = 0;

    var position = indexOfHighestValue + 1;;
    if (position == memoryBank.length) {
        position = 0;
    }
    else {
    }

    while (blocksLeftToDistribute > 0) {
        memoryBank[position]++;
        blocksLeftToDistribute--;
        
        position++;
        if (position == memoryBank.length) {
            position = 0;
        }
    }

    cycles++;
}

console.log(cycles);