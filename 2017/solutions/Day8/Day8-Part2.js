const fs = require("fs");

fs.readFile("./Day8-Input.txt", (err, data) => {
    if (err) throw err;

    let registers = {};
    let instructions = [];

    data.toString().split("\n").map(line => {
        let lineArray = line.split(" ");

        registers[lineArray[0]] = 0;

        let instruction = {
            targetRegister: lineArray[0],
            amount: parseInt(lineArray[2]),
            // if is on lineArray[3]
            conditionRegister: lineArray[4],
            conditionNumber: lineArray[6]
        };

        let conditionFunction;
        switch (lineArray[5]) {
            case ">":
                conditionFunction = (register, number) => registers[register] > number;
                break;
            case "<":
                conditionFunction = (register, number) => registers[register] < number;
                break;
            case "==":
                conditionFunction = (register, number) => registers[register] == number;
                break;
            case "!=":
                conditionFunction = (register, number) => registers[register] != number;
                break;
            case ">=":
                conditionFunction = (register, number) => registers[register] >= number;
                break;
            case "<=":
                conditionFunction = (register, number) => registers[register] <= number;
                break;
        }
        instruction.conditionFunction = conditionFunction;

        let action;
        if (lineArray[1] === "inc") {
            action = (register, number) => registers[register] += number;
        }
        else {
            action = (register, number) => registers[register] -= number;
        }
        instruction.action = action;

        instructions.push(instruction);
    });

    let largestValue = 0;
    
    function updateLargestValue(){
        Object.keys(registers).forEach(register => {
            if (registers[register] > largestValue) {
                largestValue = registers[register];
            }
        });
    }

    instructions.forEach(i => {
        if (i.conditionFunction(i.conditionRegister, i.conditionNumber)) {
            i.action(i.targetRegister, i.amount);
            updateLargestValue();
        }
    });

    console.log(largestValue);
});