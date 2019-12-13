const fs = require("fs");

let score = 0;
let groupLevel = 1;
let garbageOpen = false;

fs.readFile("./Day9-Input.txt", (err, data) => {
    if (err) throw err;
    
    const inputArray = data.toString().split("");
    for (let i = 0; i < inputArray.length; i++) {
        const character = inputArray[i];
        
        if (character === "!") {
            i++;
        }
        else if (garbageOpen && character !== '>') {
            // Do nothing
        }
        else if (character === "<") {
            garbageOpen = true;
        }
        else if (character === ">") {
            garbageOpen = false;
        }
        else if (character === "{") {
            score += groupLevel++;
        }
        else if (character === "}") {
            groupLevel--;
        }
    }

    console.log(score);
});