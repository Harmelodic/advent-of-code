require("../timer").time();

const fs = require("fs");

function getRecordDate(recordString) {
    const timeString = recordString.substring(1, recordString.indexOf("]"));
    const parts = timeString.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4] - 1, 0, 0);
}

fs.readFile(__dirname + "/inputs/day04", (err, data) => {
    if (err) throw err;

    // Unsorted
    let records = data.toString().split("\n").map(recordString => {
        return {
            date: getRecordDate(recordString),
            newGuard: recordString.includes("begins shift") ? recordString.match(/#\d+/)[0].replace("#", "") : false,
            fallsAsleep: recordString.includes("falls asleep"),
            wakesUp: recordString.includes("wakes up")
        }
    });

    records.sort((a, b) => {
        return a.date - b.date;
    })
    // We now have sorted records in JSON format
    const guardData = [];

    let currentGuard = null;
    let previousTime = null;
    records.forEach(record => {
        if (record.newGuard) {
            currentGuard = record.newGuard;

            // If guard has not yet been recorded in guardData, then add the new guard
            if (guardData.find(guard => guard.id === record.newGuard) === undefined) {
                guardData.push({
                    id: record.newGuard,
                    timeAsleep: 0,
                    minutesAsleep: Array(60).fill(0)
                })
            }
        }
        else {
            if (record.wakesUp) {
                const guard = guardData.find(guard => guard.id === currentGuard);

                let minutesSinceLastRecord = (((record.date - previousTime) % 86400000) % 3600000) / 60000;
                guard.timeAsleep += minutesSinceLastRecord;

                while (previousTime.toString() !== record.date.toString()) {
                    previousTime.setTime(previousTime.getTime() + 1000 * 60); // Add a minute
                    guard.minutesAsleep[previousTime.getMinutes()]++;
                }
            }
        }

        previousTime = record.date;
    });

    guardData.sort((a, b) => {
        return b.timeAsleep - a.timeAsleep;
    })

    const targetGuard = guardData[0];
    const minuteWhenMostAsleep = targetGuard.minutesAsleep.indexOf(Math.max(...targetGuard.minutesAsleep));

    console.log(targetGuard.id * minuteWhenMostAsleep);
})