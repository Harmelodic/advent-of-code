const myInput = "230,1,2,221,97,252,168,169,57,99,0,254,181,255,235,167";

let lengths = myInput.split(",").map(number => parseInt(number));

let circularList = [];
for (let i = 0; i < 256; i++) {
    circularList.push(i);
}

function indexToMoveToInCircularList(list, positionToMoveTo) {
    while (positionToMoveTo < 0) {
        positionToMoveTo += list.length;
    }
    while (positionToMoveTo >= list.length) {
        positionToMoveTo -= list.length;
    }
    
    return positionToMoveTo;
}


let currentPosition = 0;
let skipSize = 0;

function reverseSubListOfCircularList(list, sublistLength, positionToStartAt) {
    let subList = [];

    for (let i = 0; i < sublistLength; i++) {
        const element = list[indexToMoveToInCircularList(list, positionToStartAt + i)];
        subList.push(element);
    }

    console.log("-----------------------------------------");
    console.log(JSON.stringify(subList));
    console.log("-----------------------------------------");

    subList.reverse();

    for (let i = 0; i < sublistLength; i++) {
        list[indexToMoveToInCircularList(list, positionToStartAt + i)] = subList[i];
    }

    return list;
}

lengths.forEach(length => {
    circularList = reverseSubListOfCircularList(circularList, length, currentPosition);
    currentPosition = indexToMoveToInCircularList(circularList, currentPosition + length + skipSize);
    skipSize++;
    console.log(JSON.stringify(circularList));
    console.log("=========================================");
});

const solution = circularList[0] * circularList[1];

console.log(solution);