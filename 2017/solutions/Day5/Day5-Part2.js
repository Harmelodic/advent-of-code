const fs = require("fs");

fs.readFile("./Day5-Input.txt", (err, data) => {
    if (err) throw err;
    let maze = data.toString().split("\n").map(number => parseInt(number));

    let position = 0;
    let stepsTaken = 0;

    while (position < maze.length) {
        let nextPosition = position + maze[position];
        maze[position] = maze[position] >= 3 ? maze[position] -1 :maze[position] + 1;
        position = nextPosition;
        stepsTaken++;
    }

    console.log(stepsTaken);
});