const fs = require("fs");

fs.readFile("./Day7-Input.txt", (err, data) => {
    if (err) throw err;
    
    let formattedData = [];
    let listOfPrograms = [];
    
    data.toString().split("\n").forEach(line => {
        let program = {
            name: line.split(" ", 2)[0],
            weight: line.substring(line.indexOf("(") + 1, line.indexOf(")")),
        };

        if (line.includes("->")) {
            program.holding = line.substring(line.indexOf(">") + 2).split(", ");
        }
        else {
            program.holding = null;
        }
        
        formattedData.push(program);
        listOfPrograms.push(program.name);
    });

    let found;
    let root;

    for (let i = 0; i < listOfPrograms.length; i++) {
        const programName = listOfPrograms[i];
        found = false;

        for (let j = 0; j < formattedData.length; j++) {
            const program = formattedData[j];
            if (program.holding !== null) {
                if (program.holding.includes(programName)) {
                    found = true;
                    break;
                }
            }
        }

        if (found == false) {
            root = programName;
            break;
        }
    }

    console.log(root);
});