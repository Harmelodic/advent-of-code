const fs = require("fs");

let score = 0;
let groupLevel = 1;
let garbageOpen = false;
let garbageCount = 0;

fs.readFile("./Day9-Input.txt", (err, data) => {
    if (err) throw err;
    
    const inputArray = data.toString().split("");
    for (let i = 0; i < inputArray.length; i++) {
        const character = inputArray[i];
        
        if (character === "!") {
            i++;
        }
        else if (garbageOpen && character !== '>') {
            garbageCount++;
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

    console.log(garbageCount);
});