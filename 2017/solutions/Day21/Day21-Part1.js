const fs = require("fs");

let startingPattern = [".#.","..#","###"];


fs.readFile("./Day21-Input.txt", (err, data) => {
    if (err) throw err;

    let rules = data.toString().split("\n").map(line => {
        let rule = {};
        let conversionArray = line.split(" => ");

        rule.from = conversionArray[0].split("/");
        rule.to = conversionArray[1].split("/");

        return rule;
    });

    let art = startingPattern;

    function breakDown(art) {
        let pieces = [];
        if (art.length % 2 === 0) {
            let sizeOfArtInPieces = art.length / 2;
            for (let row = 0; row < sizeOfArtInPieces; row++) { // For each row
                let rowAddition = row * 2;
                for (let column = 0; column < sizeOfArtInPieces; column++) { // For each column
                    let columnAddition = column * 2;

                    let topLeft = art[0 + rowAddition][0 + columnAddition];
                    let topRight = art[0 + rowAddition][1 + columnAddition];
                    let bottomLeft = art[1 + rowAddition][0 + columnAddition];
                    let bottomRight = art[1 + rowAddition][1 + columnAddition];
                    piece = [topLeft + topRight, bottomLeft + bottomRight];
                    pieces.push(piece);
                }
            }
        }
        else if (art.length % 3 === 0) {
            let numberOfPiecesPerRowInArt = art.length / 3;
            for (let row = 0; row < sizeOfArtInPieces; row++) { // For each row
                let rowAddition = row * 3;
                for (let column = 0; column < sizeOfArtInPieces; column++) { // For each column
                    let columnAddition = column * 3;

                    let topLeft = art[0 + rowAddition][0 + columnAddition];
                    let topMiddle = art[0 + rowAddition][1 + columnAddition];
                    let topRight = art[0 + rowAddition][2 + columnAddition];

                    let middleLeft = art[1 + rowAddition][0 + columnAddition];
                    let centre = art[1 + rowAddition][1 + columnAddition];
                    let middleRight = art[1 + rowAddition][2 + columnAddition];

                    let bottomLeft = art[2 + rowAddition][0 + columnAddition];
                    let bottomMiddle = art[2 + rowAddition][1 + columnAddition];
                    let bottomRight = art[2 + rowAddition][2 + columnAddition];
                    
                    piece = [topLeft + topMiddle + topRight, middleLeft + centre + middleRight, bottomLeft + bottomMiddle + bottomRight];
                    pieces.push(piece);
                }
            }
        }
        return pieces;
    }

    function checkPieceAgainstRules(piece) {
        rules.forEach(rule => {
            if (rule.from.toString() === piece.toString()) {
                return true;
            }
        })
        return false;
    }

    function rotate(piece) {

    }

    function flip(piece) {
        
    }

    function getResolutionOf(piece) {
        rules.forEach(rule => {
            if (rule.from.toString() === piece.toString()) {
                return rules.to;
            }
        });
        return null; // This should never happen.
    }

    function convert(piece) {
        if (!checkPieceAgainstRules(piece)) {
            piece = rotate(piece);
            if (!checkPieceAgainstRules(piece)) {
                piece = rotate(piece);
                if (!checkPieceAgainstRules(piece)) {
                    piece = rotate(piece);
                    if (!checkPieceAgainstRules(piece)) {
                        piece = flip(piece);
                        if (!checkPieceAgainstRules(piece)) {
                            piece = rotate(piece);
                            if (!checkPieceAgainstRules(piece)) {
                                piece = rotate(piece);
                                if (!checkPieceAgainstRules(piece)) {
                                    piece = rotate(piece);
                                }
                            }
                        }
                    }
                }
            }
        }
        return getResolutionOf(piece);
    }

    for (let i = 0; i < 5; i++) {
        let piecesOfArt = breakDown(art);
        let newPiecesOfArt = [];
        piecesOfArt.forEach(piece => {
            newPiecesOfArt.push(convert(piece));
        });
        art = stitch(newPiecesOfArt);
    }

    let solution = countPixelsOn(art);

    console.log(solution);
});