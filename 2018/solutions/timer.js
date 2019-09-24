exports.time = () => {
    console.log("");
    const startTime = Date.now();

    process.on("exit", () => {
        const endTime = Date.now();

        console.log("");
        console.log("ANALYTICS")
        console.log("---------");
        console.log("Time Taken: " + (endTime - startTime) + "ms");
        console.log("");
    })
}