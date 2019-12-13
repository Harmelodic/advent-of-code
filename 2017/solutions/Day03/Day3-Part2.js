const myInput = 361527;

let spiralGrid = [[1]];

function getSpiralGridCentre(){
    return {
        x: (spiralGrid.length + 1) / 2,
        y: (spiralGrid[0].length + 1) / 2
    };
}

function currentSpiralFilled() {
    let spiralEdgeValue = spiralGrid.length - 1;
    return (spiralGrid[spiralEdgeValue][spiralEdgeValue] !== undefined);
}

function expandSpiralGrid() {
    beforeSpiralSize = spiralGrid.length;
    spiralGrid.push(new Array(beforeSpiralSize));
    spiralGrid.splice(0, 0, new Array(beforeSpiralSize));

    spiralGrid.forEach(column => {
        column.push(undefined);
        column.splice(0, 0, undefined);
    });
}

function checkAndReturnActualValue(x, y) {
    if (spiralGrid[x] !== undefined && spiralGrid[x] !== null) {
        if (spiralGrid[x][y] !== undefined && spiralGrid[x][y] !== null) {
            return spiralGrid[x][y];
        }
    }

    // else
    return 0;
}

function getTop(x, y) {
    return checkAndReturnActualValue(x, y - 1);
}

function getTopRight(x, y) {
    return checkAndReturnActualValue(x + 1, y - 1);
}

function getRight(x, y) {
    return checkAndReturnActualValue(x + 1, y);
}

function getBottomRight(x, y) {
    return checkAndReturnActualValue(x + 1, y + 1);
}

function getBottom(x, y) {
    return checkAndReturnActualValue(x, y + 1);
}

function getBottomLeft(x, y) {
    return checkAndReturnActualValue(x - 1, y + 1);
}

function getLeft(x, y) {
    return checkAndReturnActualValue(x - 1, y);
}

function getTopLeft(x, y) {
    return checkAndReturnActualValue(x - 1, y - 1);
}

function calcValueFor(x, y) {
    return getTop(x, y) + getTopRight(x, y) + getRight(x, y) + getBottomRight(x, y) + getBottom(x, y) + getBottomLeft(x, y) + getLeft(x, y) + getTopLeft(x, y);
}

let currentSideOfGrid = {
    top: false,
    right: false,
    bottom: false,
    left: false
}

function calculateNextPosition(currentPosition) {
    let xPos;
    let yPos;
    if (currentSideOfGrid.right) { // If on right side
        xPos = currentPosition.x;
        yPos = currentPosition.y - 1;

        if (yPos === 0) {
            currentSideOfGrid.top = true;
            currentSideOfGrid.right = false;
        }
    }
    else if (currentSideOfGrid.top) { // If on top side
        xPos = currentPosition.x - 1;
        yPos = currentPosition.y;

        if (xPos === 0) {
            currentSideOfGrid.top = false;
            currentSideOfGrid.left = true;
        }
    }
    else if (currentSideOfGrid.left) { // If on left side
        xPos = currentPosition.x;
        yPos = currentPosition.y + 1;

        if (yPos === spiralGrid[0].length - 1) {
            currentSideOfGrid.left = false;
            currentSideOfGrid.bottom = true;
        }
    }
    else if (currentSideOfGrid.bottom) { // If on bottom side
        xPos = currentPosition.x + 1;
        yPos = currentPosition.y;

        if (xPos === spiralGrid.length - 1) {
            currentSideOfGrid.bottom = false;
        }
    }
    else { // If new layer of the spiral has been generated (thus not on any side)
        currentSideOfGrid.right = true;
        xPos = spiralGrid.length - 1;
        yPos = spiralGrid[0].length - 2;
    }

    return {
        x: xPos,
        y: yPos
    }
}

let lastValueGenerated = 1;

let currentPosition = getSpiralGridCentre();

while (lastValueGenerated < myInput) {
    if (currentSpiralFilled()) {
        expandSpiralGrid();
    }

    currentPosition = calculateNextPosition(currentPosition);

    let newValue = calcValueFor(currentPosition.x, currentPosition.y);

    spiralGrid[currentPosition.x][currentPosition.y] = newValue;

    // for (let i = 0; i < spiralGrid.length; i++) {
    //     let row = ""
    //     spiralGrid.forEach(column => {
    //         row += "\t" + (column[i] === undefined ? "-" : column[i]);
    //     });
    //     console.log(row);
    // }
    // console.log("======================")
    lastValueGenerated = newValue;
}

console.log(lastValueGenerated);