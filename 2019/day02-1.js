#!node
require('../timer').time();

let result;

const reader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/inputs/day02')
})

reader.on('line', line => {
    const gravityAssistProgram = line.split(',').map(position => parseInt(position));
    
    // To do this, before running the program, 
    // replace position 1 with the value 12
    gravityAssistProgram[1] = 12
    // and replace position 2 with the value 2. 
    gravityAssistProgram[2] = 2

    let shouldContinue = true;
    let intcodeOffset = 0;

    while (shouldContinue) {
        shouldContinue = executeIntcodeProgram(gravityAssistProgram, intcodeOffset);
        intcodeOffset += 4;
    }

    result = gravityAssistProgram[0];
});

function executeIntcodeProgram(fullProgram, intcodeOffset) {
    const opcode = fullProgram[0 + intcodeOffset];
    const positionOne = fullProgram[1 + intcodeOffset];
    const positionTwo = fullProgram[2 + intcodeOffset];
    const storeLocation = fullProgram[3 + intcodeOffset];

    switch (opcode) {
        case 1:
            fullProgram[storeLocation] = fullProgram[positionOne] + fullProgram[positionTwo];
            return true;
            break;
        case 2:
            fullProgram[storeLocation] = fullProgram[positionOne] * fullProgram[positionTwo];
            return true;
        case 99:
            return false;
    }
}

reader.on('close', () => {
    console.log(`Result: ${result}`);
});
