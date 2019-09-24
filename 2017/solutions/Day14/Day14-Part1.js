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

let solution = 0;

grid.forEach(column => {
    column.forEach(cell => {
        if (cell === "1") {
            solution++;
        }
    });
});

console.log(solution);