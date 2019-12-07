require("../timer").time();

const fs = require("fs");

fs.readFile(__dirname + "/inputs/day02", (err, data) => {
    if (err) throw err;
    const boxIds = data.toString().split("\n");

    boxIds.forEach(id1 => {
        boxIds.forEach(id2 => {
            const result = stringXor(id1, id2);
            let characterCount = (result.match(new RegExp("0", "g")) || []).length;
            if (characterCount === 1) {
                const differentStrings = result.replace("0", "");
                console.log(differentStrings);
                process.exit();
            }
        })
    });
})


// A makeshift XOR function that returns:
// the letter if the letter is the same,
// and 0 is when the letter is different.
function stringXor(str1, str2) {
    const result = [];
    const array1 = str1.split("");
    const array2 = str2.split("");

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] === array2[i]) {
            result[i] = array1[i];
        }
        else {
            result[i] = 0;
        }
    }
    return result.join("");
}