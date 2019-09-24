let me = "PID: " + process.pid + " - Process: " + process.argv[2];

console.log(me);

const fs = require("fs");

fs.readFile("./Day18-Input.txt", (err, data) => {

    let instructions = data.toString().split("\n").map(instruction => instruction.split(" "));

    let registers = {
        p: parseInt(process.argv[2])
    };
    let receivedValues = [];
    let waiting = false;

    process.on("message", (message) => {
        receivedValues.push(message.body);
    });

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
        let message = {
            type: "value",
            body: value
        };
        process.send(message);
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

    function rcv(register) {
        if (receivedValues.length > 0) {
            if (waiting) {
                waiting = false;
                process.send({type: "StopWaiting"});
            }
            let valueToAssign = receivedValues.shift();
            set(register, valueToAssign);
        }
        else {
            waiting = true;
            process.send({type: "StartWaiting"})
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
                rcv(instruction[1]);
                break;
            case "jgz":
                i += jgz(instruction[1], instruction[2]) - 1;
                break;
            default:
                break;
        }
        
        if (waiting) {
            i--;
        }
    }
});