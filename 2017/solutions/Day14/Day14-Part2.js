const myInput = "jxqlasbh";
const khm = require("./Day14-KnotHashModule");

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

function hex2bin(hexadecimalHash) {
    let binaryValue = "";
    
    hexadecimalHash.split("").forEach(hexElement => {
        binaryValue += pad(parseInt(hexElement, 16).toString(2), 4);
    });

    return binaryValue;
}

let grid = new Array(128);

for (let i = 0; i < 128; i++) {
    grid[i] = new Array(128);
}

for (let i = 0; i < 128; i++) {
    let hashInput = myInput + "-" + i;
    let hexadecimalHash = khm.knotHash(hashInput);

    let binaryValue = hex2bin(hexadecimalHash);

    binaryValue.split("").forEach((binaryDigit, binaryDigitIndex) => {
        grid[binaryDigitIndex][i] = binaryDigit;
    });
}

function convertRegion(x, y) {
    grid[x][y] = "0";

    let adjacentCellsToConvert = [];

    function checkAndAdd(xCoord, yCoord) {
        if (grid[xCoord][yCoord] === "1") {
            adjacentCellsToConvert.push({
                x: xCoord,
                y: yCoord
            });
        }
    }

    // Check Above
    if (y !== 0) {
        checkAndAdd(x, y - 1);
    }

    // Check Below
    if (y !== grid[x].length - 1) {
        checkAndAdd(x, y + 1);
    }

    // Check Left
    if (x !== 0) {
        checkAndAdd(x - 1, y);
    }

    // Check Right
    if (x !== grid.length - 1) {
        checkAndAdd(x + 1, y);
    }

    adjacentCellsToConvert.forEach(cell => {
        convertRegion(cell.x, cell.y);
    })
}

let solution = 0;

grid.forEach((column, x) => {
    column.forEach((cell, y) => {
        if (cell === "1") {
            solution++;

            convertRegion(x, y);
        }
    });
});

console.log(solution);