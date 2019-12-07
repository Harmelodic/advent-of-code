require("../timer").time();
const readline = require("readline");
const fs = require("fs");

function parseClaim(claimString) {
    const claim = {
        id: null,
        left: null,
        top: null,
        x: null,
        y: null
    }

    const claimArray = claimString.split(" ");
    claim.id = claimArray[0].replace("#", "");
    claim.left = parseInt(claimArray[2].substring(0, claimArray[2].indexOf(",")));
    claim.top = parseInt(claimArray[2].substring(claimArray[2].indexOf(",") + 1, claimArray[2].indexOf(":")));
    claim.x = parseInt(claimArray[3].substring(0, claimArray[3].indexOf("x")));
    claim.y = parseInt(claimArray[3].substring(claimArray[3].indexOf("x") + 1));

    return claim;
}

// Creates a 2d array that is 1000 elements wide.
const fabricGrid = Array(1001).fill().map(() => new Array(1000).fill(0));

const reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/inputs/day03")
})

reader.on("line", claimString => {
    const claim = parseClaim(claimString);

    for (let i = 0; i < claim.x; i++) {
        for (let j = 0; j < claim.y; j++) {
            if (fabricGrid[claim.left + i][claim.top + j] === 0) {
                fabricGrid[claim.left + i][claim.top + j] = 1;
            }
            else {
                fabricGrid[claim.left + i][claim.top + j]++;
            }
        }
    }
})

reader.on("close", () => {
    let lonelyClaim = null;

    const verificationReader = readline.createInterface({
        input: fs.createReadStream(__dirname + "/inputs/day03")
    })

    verificationReader.on("line", claimString => {
        const claim = parseClaim(claimString);
        let overlappedByOtherClaim = false;

        for (let i = 0; i < claim.x; i++) {
            for (let j = 0; j < claim.y; j++) {
                if (fabricGrid[claim.left + i][claim.top + j] >= 2) {
                    overlappedByOtherClaim = true;
                }
            }
        }

        if (!overlappedByOtherClaim) {
            lonelyClaim = claim.id;
            verificationReader.close();
        }
    })
    
    verificationReader.on("close", () => {  
        console.log(lonelyClaim);
    });
})