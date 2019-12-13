#!node
require('../timer').time();

let result;

const reader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/inputs/day02')
})

reader.on('line', line => {
    const gravityAssistProgram = line.split(',').map(position => parseInt(position));
    
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const program = Object.assign([], gravityAssistProgram);
            
            replaceInitialAddresses(program, noun, verb);

            if (executeIntcodeProgram(program) === 19690720) {
                result = (100 * noun) + verb;
                break;
            }
        }
        // Break if final result found (saves 1ms)
        if (result) {
            break;
        }
    }
});

function replaceInitialAddresses(program, noun, verb) {
    program[1] = noun;
    program[2] = verb;
}

function executeIntcodeProgram(program, lengthOfInstruction = 4, instructionPointer = 0) {
    let shouldContinue = true;

    while (shouldContinue) {
        const opcode = program[0 + instructionPointer];
        const parameterOne = program[1 + instructionPointer];
        const parameterTwo = program[2 + instructionPointer];
        const parameterThree = program[3 + instructionPointer];

        switch (opcode) {
            case 1: // Addition
                program[parameterThree] = program[parameterOne] + program[parameterTwo];
                shouldContinue = true;
                break;
            case 2: // Multiplication
                program[parameterThree] = program[parameterOne] * program[parameterTwo];
                shouldContinue = true;
                break;
            case 99: // Halt
                shouldContinue = false;
        }

        instructionPointer += lengthOfInstruction;
    }

    return program[0];
}

reader.on('close', () => {
    console.log(`Result: ${result}`);
});
