const fs = require("fs");

const root = "rqwgj";

fs.readFile("./Day7-Input.txt", (err, data) => {
    if (err) throw err;
    
    let formattedData = [];
    
    data.toString().split("\n").forEach(line => {
        let program = {
            name: line.split(" ", 2)[0],
            weight: parseInt(line.substring(line.indexOf("(") + 1, line.indexOf(")"))),
        };

        if (line.includes("->")) {
            program.holding = line.substring(line.indexOf(">") + 2).split(", ");
        }
        else {
            program.holding = null;
        }
        
        formattedData.push(program);
    });

    function buildTreeNode(programName) {
        foundProgram = formattedData.find(element => element.name == programName);
        let node = {
            name: foundProgram.name,
            weight: foundProgram.weight,
            holding: []
        };

        if (foundProgram.holding === null) {
            node.holding == null;
        }
        else {
            foundProgram.holding.forEach(subProgram => {
                node.holding.push(buildTreeNode(subProgram));
            });
        }

        return node;
    }

    let tower = buildTreeNode(root);

    // WE NOW HAVE A TREE! :D

    function weightOfSubTowerFromAndIncluding(node) {
        let totalWeight = node.weight;
        if (node.holding !== null) {
            node.holding.forEach(subNode => {
                totalWeight += weightOfSubTowerFromAndIncluding(subNode);
            });
        }
        return totalWeight;
    }

    function countOccurances(array, object) {
        let count = 0;
        array.forEach(element => {
            if (object === element) {
                count++;
            }
        });
        return count;
    }

    let brokenNode;
    let parentOfBrokenNode = tower; // default to tower as it's the root node

    function findDescrepancyIn(node) {
        if (node.holding === null){
            brokenNode = node;
        }
        else {
            let weightOfChildren = [];
            node.holding.forEach(subNode => {
                weightOfChildren.push(weightOfSubTowerFromAndIncluding(subNode));
            });
            let indexOfOddOneOut = weightOfChildren.indexOf(weightOfChildren.filter(weightOfChild => countOccurances(weightOfChildren, weightOfChild) === 1)[0]);
            if (indexOfOddOneOut === -1) { // i.e. there isn't an odd one out
                brokenNode = node;
            }
            else {
                parentOfBrokenNode = node;
                findDescrepancyIn(node.holding[indexOfOddOneOut]);
            }
        }
    }

    findDescrepancyIn(tower);

    const indexOfBrokenNode = parentOfBrokenNode.holding.findIndex(child => child.name == brokenNode.name);
    const indexOfStableNode = indexOfBrokenNode === 0 ? 1 : 0;

    const subTowerWeightOfBrokenNode = weightOfSubTowerFromAndIncluding(brokenNode);
    const subTowerWeightOfStableNode = weightOfSubTowerFromAndIncluding(parentOfBrokenNode.holding[indexOfStableNode]);

    const offsetWeight = subTowerWeightOfBrokenNode > subTowerWeightOfStableNode ? subTowerWeightOfStableNode - subTowerWeightOfBrokenNode : subTowerWeightOfBrokenNode - subTowerWeightOfStableNode;

    const solution = brokenNode.weight + offsetWeight;
    
    console.log(solution);
});