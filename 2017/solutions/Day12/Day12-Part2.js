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

    function searchForProgramsToAddToGroup(program, groupArray) {
        groupArray.push(program.id);

        program.pipesTo.forEach(connectedProgram => {
            if (!groupArray.includes(connectedProgram)) {
                searchForProgramsToAddToGroup(formattedInput[connectedProgram], groupArray);
            }
        });
    }

    let groups = [];
    formattedInput.forEach((program, index) => {
        groups[index] = [];
        searchForProgramsToAddToGroup(program, groups[index]);
        groups[index].sort();
        groups[index] = groups[index].join("");
    });

    let uniqueGroups = new Set(groups);
    console.log(uniqueGroups.size);
});