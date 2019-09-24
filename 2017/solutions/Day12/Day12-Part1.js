const fs = require("fs");

fs.readFile("./Day12-Input.txt", (err, data) => {
    if (err) throw err;

    let formattedInput = [];

    data.toString().split("\n").forEach(line => {
        let program = {};

        program.id = parseInt(line.substring(0, line.indexOf(" ")));

        program.pipesTo = line.substring(line.indexOf(">") + 2).split(", ").map(child => parseInt(child));

        formattedInput.push(program);
    });

    let group = [];

    function searchForProgramsToAddToGroup(program) {
        group.push(program.id);

        program.pipesTo.forEach(connectedProgram => {
            if (!group.includes(connectedProgram)) {
                searchForProgramsToAddToGroup(formattedInput[connectedProgram]);
            }
        });
    }

    searchForProgramsToAddToGroup(formattedInput[0]);

    console.log(group.length);
});