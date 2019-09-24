const myInput = 361527;

// So my thinking is:
// Within each ring, the highest number are odd numbers being squared.
// So 1 is 1 squared.
// In the next ring, it's 3 squared (9)
// in the next ring, it's 5 squared (25)
// So I can find which ring the input is in, by interating odd numbers until the odd number squared is bigger than the input.
// That odd number is also dimension of that ring.
// Then place a cursor on the bottom right of that ring and then work our way back.
// Then calculate a translation vector from the number's coordinates to the center of the ring (which will be the ring dimension + 1, all divided by 2)
// Then add the absolute values of the translation vector together is the number of steps.

let ring;
let ringDimension;

for (let index = 1; true; index += 2) {
    if (Math.pow(index, 2) >= myInput) {
        ring = (index - 1) / 2;
        ringDimension = index;
        break;
    }
}

const centralCoordinates = [(ringDimension + 1) / 2, (ringDimension + 1) / 2];

let cursorCoordinates = [ringDimension, ringDimension];

const linearDistanceToMoveBack = Math.pow(ringDimension, 2) - myInput;

const distanceInAQuarter = ringDimension - 1;

const ringQuarterToMoveBack = Math.floor(linearDistanceToMoveBack / distanceInAQuarter);

const remainderToMoveBack = Math.floor(linearDistanceToMoveBack % distanceInAQuarter);

switch (ringQuarterToMoveBack) {
    case 3:
        cursorCoordinates[0] = cursorCoordinates[0] - distanceInAQuarter;
        cursorCoordinates[1] = cursorCoordinates[1] - distanceInAQuarter;
        cursorCoordinates[0] = cursorCoordinates[0] + distanceInAQuarter;
        cursorCoordinates[1] = cursorCoordinates[1] + remainderToMoveBack;
        break;
    case 2:
        cursorCoordinates[0] = cursorCoordinates[0] - distanceInAQuarter;
        cursorCoordinates[1] = cursorCoordinates[1] - distanceInAQuarter;
        cursorCoordinates[0] = cursorCoordinates[0] + remainderToMoveBack;
        break;
    case 1:
        cursorCoordinates[0] = cursorCoordinates[0] - distanceInAQuarter;
        cursorCoordinates[1] = cursorCoordinates[1] - remainderToMoveBack;
        break;
    case 0:
        cursorCoordinates[0] = cursorCoordinates[0] - remainderToMoveBack;
        break;
    default:
        break;
}

const translationVector = [
    centralCoordinates[0] - cursorCoordinates[0],
    centralCoordinates[1] - cursorCoordinates[1]
]

solution = Math.abs(translationVector[0]) + Math.abs(translationVector[1]);

console.log(solution);