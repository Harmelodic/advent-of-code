require("../timer").time();

const fs = require("fs");

fs.readFile(__dirname + "/inputs/day05", (err, data) => {
    if (err) throw err;

    let polymer = data.toString();
    let polymerPreReactionLength = -1;

    while (polymer.length !== polymerPreReactionLength) {
        polymerPreReactionLength = polymer.length;
        polymer = react(polymer);
    }

    console.log(polymer.length);
})

function react(polymer) {
    return polymer.replace(/aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz/g, "");
}