require("../timer").time();

const readline = require("readline");
const fs = require("fs");

const reader = readline.createInterface({
    input: fs.createReadStream(__dirname + "/inputs/day06")
})

const grid = Array(400).fill().map(() => new Array(400).fill(0));

const coordinates = [];

reader.on("line", line => {
    coordinates.push(line.replace(" ", "").split(",").map(coord => parseInt(coord)));
})

reader.on("close", () => {
    coordinates.forEach(coordinatePair => {
        grid[coordinatePair[0]][coordinatePair[1]] = 1;
    })


    // Uncomment below code if you want to see the grid produced

    // const gridString = JSON.stringify(grid)
    //     .replace(/],/g, "],\n", "") // Force grid layout
    //     .replace(/0/g, "-") // Zeroes make the claims hard to see, - is easier
    //     .replace("[[", "[\n["); // Prevent line 0 offset

    // fs.writeFile(__dirname + '/out/day06-1.grid.txt', gridString, (err) => {
    //     if (err) throw err;
    // });
})