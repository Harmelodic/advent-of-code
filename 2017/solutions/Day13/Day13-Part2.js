const fs = require("fs");

fs.readFile("./Day13-Input.txt", (err, data) => {

    const scanners = data.toString().split("\n").map(s => s.match(/\d+/g).map(Number));

    function caught(delay) {
        return ([depth, range]) => {
            return (delay + depth) % (2 * (range - 1)) === 0;
        }
    }

    let delay = -1;

    while (scanners.some(caught(++delay))) {
        // Do nothing, we're waiting until it's false! (i.e. nothing is caught)
    };
    
    console.log(delay);
});
