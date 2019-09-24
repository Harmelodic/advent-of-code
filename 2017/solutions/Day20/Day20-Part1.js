const fs = require("fs");

function manhattanDistance(x, y, z){
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

function particleClosestToOrigin(listOfDistances) {
    let min = Math.min(...listOfDistances);
    return listOfDistances.indexOf(min);
}

fs.readFile("./Day20-Input.txt", (err, data) => {
    if (err) throw err;

    let particles = data.toString().split("\n").map(line => {
        let particleInfo = line.split(", ").map(string => string.substring(string.indexOf("<") + 1, string.indexOf(">")).split(",").map(number => parseInt(number)));

        let particle = {
            position: {
                x: particleInfo[0][0],
                y: particleInfo[0][1],
                z: particleInfo[0][2]
            },
            velocity: {
                x: particleInfo[1][0],
                y: particleInfo[1][1],
                z: particleInfo[1][2]
            },
            acceleration: {
                x: particleInfo[2][0],
                y: particleInfo[2][1],
                z: particleInfo[2][2]
            }
        }

        return particle;
    });

    let particlesClosestCount = new Array(particles.length).fill(0);

    // Long term...lets say...5000 ticks?
    for (let i = 0; i <= 5000; i++) {
        let manhattanDistances = [];
        particles.forEach((particle, index) => {
            particle.velocity.x += particle.acceleration.x;
            particle.velocity.y += particle.acceleration.y;
            particle.velocity.z += particle.acceleration.z;

            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;
            particle.position.z += particle.velocity.z;

            manhattanDistances.push(manhattanDistance(particle.position.x, particle.position.y, particle.position.z));
        });

        particlesClosestCount[particleClosestToOrigin(manhattanDistances)]++;
    }

    const solution = particlesClosestCount.indexOf(Math.max(...particlesClosestCount));

    console.log(solution);
});