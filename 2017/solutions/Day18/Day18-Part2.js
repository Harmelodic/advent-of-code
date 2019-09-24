const {fork} = require('child_process');

const p0 = fork(`${__dirname}/Day18-Part2-ChildProcess.js`, ["0"]);
const p1 = fork(`${__dirname}/Day18-Part2-ChildProcess.js`, ["1"]);

let statuses = {
    process0Waiting: false,
    process1Waiting: false
}
let p0SendCount = 0;
let p1SendCount = 0;

function checkIfNeedToTerminate() {
    if (statuses.process0Waiting && statuses.process1Waiting) {
        p0.kill();
        p1.kill();
        console.log("Count of 0: " + p0SendCount);
        console.log("Count of 1: " + p1SendCount);
        process.kill(process.pid);
    }
    return true;
}

p0.on('message', (message) => {
    if (message.type === "StartWaiting") {
        statuses.process0Waiting = true;
        checkIfNeedToTerminate();
    }
    else if (message.type === "StopWaiting") {
        statuses.process0Waiting = false;
    }
    else {
        p0SendCount++;
        p1.send(message);
    }
});

p1.on('message', (message) => {
    if (message.type === "StartWaiting") {
        statuses.process1Waiting = true;
        checkIfNeedToTerminate();
    }
    else if (message.type === "StopWaiting") {
        statuses.process1Waiting = false;
    }
    else {
        p1SendCount++;
        p0.send(message);
    }
});