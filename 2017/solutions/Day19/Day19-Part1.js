const fs = require("fs");

let currentPosition = {
    x: 0,
    y: 0
}

let directionMoving = {
    down: true,
    right: false,
    left: false,
    up: false
}

function moveDown() {
    currentPosition.y++;
}

function moveRight() {
    currentPosition.x++;
}

function moveUp() {
    currentPosition.y--;
}

function moveLeft() {
    currentPosition.x--;
}

function continueMove() {
    if (directionMoving.down){
        moveDown();
    }
    else if (directionMoving.left) {
        moveLeft();
    }
    else if (directionMoving.right) {
        moveRight();
    }
    else if (directionMoving.up) {
        moveUp();
    }
}

fs.readFile("./Day19-Input.txt", (err, data) => {
    if (err) throw err;

    let grid = data.toString().split("\n").map(line => line.split(""));

    currentPosition.x = grid[0].indexOf("|"); // Set current position to start

    let letters = [];

    function turnUpOrDown() {
        if (grid[currentPosition.y + 1][currentPosition.x] !== " ") {
            directionMoving.down = true;
            moveDown();
        }
        else {
            directionMoving.up = true;
            moveUp();
        }
    }

    function turnLeftOrRight() {
        if (grid[currentPosition.y][currentPosition.x - 1] !== " ") {
            directionMoving.left = true;
            moveLeft();
        }
        else {
            directionMoving.right = true;
            moveRight();
        }
    }

    function turn() {
        if (directionMoving.down){
            directionMoving.down = false;
            turnLeftOrRight();
        }
        else if (directionMoving.left) {
            directionMoving.left = false;
            turnUpOrDown();
        }
        else if (directionMoving.right) {
            directionMoving.right = false;
            turnUpOrDown();
        }
        else if (directionMoving.up) {
            directionMoving.up = false;
            turnLeftOrRight();
        }
    }

    function calculateNewPosition() {
        let character = grid[currentPosition.y][currentPosition.x];
        // console.log(character + JSON.stringify(directionMoving));
        if (character === "+") {
            turn();
        }
        else if (character === " ") {
            return false;
        }
        else if (character === "|" || character === "-") {
            continueMove();
        }
        else {
            letters.push(grid[currentPosition.y][currentPosition.x]);
            continueMove();
        }

        return true;
    }

    let routing = true;
    while (routing) {
        routing = calculateNewPosition();
    }

    console.log(letters.join(""));
});