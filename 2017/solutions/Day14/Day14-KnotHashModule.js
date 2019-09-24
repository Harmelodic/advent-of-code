module.exports.knotHash = function(myInput) {

    const myInputInAsciiCodes = myInput.split("").map(element => element.charCodeAt(0));

    let lengths = myInputInAsciiCodes.concat([17, 31, 73, 47, 23]);

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

    function reverseSubListOfCircularList(list, sublistLength, positionToStartAt) {
        let subList = [];

        for (let i = 0; i < sublistLength; i++) {
            const element = list[indexToMoveToInCircularList(list, positionToStartAt + i)];
            subList.push(element);
        }

        subList.reverse();

        for (let i = 0; i < sublistLength; i++) {
            list[indexToMoveToInCircularList(list, positionToStartAt + i)] = subList[i];
        }

        return list;
    }

    let currentPosition = 0;
    let skipSize = 0;
    const rounds = 64;

    for (let roundsCompleted = 0; roundsCompleted < rounds; roundsCompleted++) {
        lengths.forEach(length => {
            circularList = reverseSubListOfCircularList(circularList, length, currentPosition);
            currentPosition = indexToMoveToInCircularList(circularList, currentPosition + length + skipSize);
            skipSize++;
        });
    }

    function xorSixteen(values) {
        return values.reduce((a, b) => a ^ b);
    }

    sparseHash = circularList;
    denseHash = [];

    for (let i = 0; i < sparseHash.length; i += 16) {
        denseHash.push(xorSixteen(sparseHash.slice(i, i + 16)));
    }

    const solution = denseHash.map(number => ("0" + number.toString(16)).slice(-2)).join("");

    return solution;
}