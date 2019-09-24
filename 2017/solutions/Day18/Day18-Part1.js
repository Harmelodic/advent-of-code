const fs = require("fs");

fs.readFile("./Day18-Input.txt", (err, data) => {

    let instructions = data.toString().split("\n").map(instruction => instruction.split(" "));

    let lastSoundPlayed;
    let registers = {};
    let recoveredSounds = [];

    function createIfNull(letter) {
        if (registers[letter] === undefined) {
            registers[letter] = 0;
        }
    }

    function actualValueOf(value) {
        let actualValue;
        if (value.match(/[a-z]+/)) {
            createIfNull(value);
            actualValue = registers[value];
        }
        else {
            actualValue = parseInt(value);
        }
        return actualValue;
    }

    function snd(value) {
        value = actualValueOf(value);
        lastSoundPlayed = value;
    }

    function set(register, value) {
        createIfNull(register);
        value = actualValueOf(value);
        registers[register] = value;
    }

    function add(register, value) {
        createIfNull(register);
        value = actualValueOf(value);
        registers[register] += value;
    }

    function mul(register, value) {
        createIfNull(register);
        value = actualValueOf(value);
        registers[register] = registers[register] * value;
    }

    function mod(register, value) {
        createIfNull(register);
        value = actualValueOf(value);
        registers[register] = registers[register] % value;
    }

    function rcv(value) {
        value = actualValueOf(value);
        
        if (value !== 0) {
            return lastSoundPlayed;
        }
        else {
            return null;
        }
    }

    function jgz(value, offset) {
        value = actualValueOf(value);
        offset = actualValueOf(offset);

        if (value > 0) {
            return offset;
        }
        else {
            return 1;
        }
    }

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        
        switch (instruction[0]) {
            case "snd":
                snd(instruction[1]);
                break;
            case "set":
                set(instruction[1], instruction[2]);
                break;
            case "add":
                add(instruction[1], instruction[2]);
                break;
            case "mul":
                mul(instruction[1], instruction[2]);
                break;
            case "mod":
                mod(instruction[1], instruction[2]);
                break;
            case "rcv":
                let recoveredSound = rcv(instruction[1]);
                if (recoveredSound !== null) {
                    recoveredSounds.push(recoveredSound);
                }
                break;
            case "jgz":
                i += jgz(instruction[1], instruction[2]) - 1;
                break;
            default:
                break;
        }
        
        if (recoveredSounds.length > 0) {
            break;
        }
    }

    console.log(recoveredSounds[0]);

});