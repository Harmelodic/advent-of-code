require("../timer").time();

const fs = require("fs");

fs.readFile(__dirname + "/inputs/day05", (err, data) => {
    if (err) throw err;

    let polymer = data.toString();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let shortestLengthSoFar = polymer.length;

    alphabet.forEach(letter => {
        temporaryPolymer = polymer.replace(new RegExp(letter + "|" + letter.toUpperCase(), "g"), "");

        let polymerPreReactionLength = -1;
        while (temporaryPolymer.length !== polymerPreReactionLength) {
            polymerPreReactionLength = temporaryPolymer.length;
            temporaryPolymer = react(temporaryPolymer);
        }

        if (temporaryPolymer.length < shortestLengthSoFar) {
            shortestLengthSoFar = temporaryPolymer.length;
        }
    })


    console.log(shortestLengthSoFar);
})

function react(polymer) {
    return polymer.replace(/aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz/g, "");
}