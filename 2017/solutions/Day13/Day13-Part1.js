const fs = require("fs");

fs.readFile("./Day13-Input.txt", (err, data) => {
    if (err) throw err;

    let scanners = {};

    data.toString().split("\n").forEach(line => {

        key = line.substring(0, line.indexOf(":")); // Depth
        value = parseInt(line.substring(line.indexOf(":" ) + 1)); // Range

        scanners[key] = value;
    });

    let lengthOfFirewall = Object.keys(scanners).reduce((a, b) => a > b ? a : b);

    let firewall = [];

    for (let i = 0; i <= lengthOfFirewall; i++) {
        firewall[i] = {
            movingDown: true,
            scanner: null
        };

        if (scanners[i] !== undefined) {
            firewall[i].scanner = [];
            for (let r = 0; r < scanners[i]; r++) {
                firewall[i].scanner.push(0);
            }

            firewall[i].scanner[0] = 1;
        }
    }

    let severityOfTrip = 0;
    let packetPosition = -1; // Starting before the firewall, firewall starts at 0

    function moveScanner(layer) {
        let currentPositionOfScanner = layer.scanner.indexOf(1);
        let newPositionOfScanner;

        if (layer.movingDown) {
            newPositionOfScanner = currentPositionOfScanner + 1;

            if (newPositionOfScanner === layer.scanner.length - 1) {
                layer.movingDown = false;
            }
        }
        else {
            newPositionOfScanner = currentPositionOfScanner - 1;

            if (newPositionOfScanner === 0) {
                layer.movingDown = true;
            }
        }

        layer.scanner[currentPositionOfScanner] = 0;
        layer.scanner[newPositionOfScanner] = 1;
    }

    function step() {
        packetPosition++;

        firewall.forEach((layer, indexOfLayer) => {
            if (layer.scanner !== null) {
                let caught = packetPosition === indexOfLayer && layer.scanner.indexOf(1) === 0
                if (caught) {
                    severityOfTrip += indexOfLayer * layer.scanner.length;
                }

                moveScanner(layer);
            }
        });
    }

    while (packetPosition <= firewall.length) {
        step();
    }

    console.log(severityOfTrip);
});