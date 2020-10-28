const { Worker} = require("worker_threads");
const workerScriptFilePath = require.resolve("./worker-script.js");

console.log('2000000')
let nextPropertyId = 2000000;

for (let i = 1; i <=7; i++) {
    const worker = new Worker(workerScriptFilePath, {workerData: i});

    worker.on("message", (output) => {
      worker.postMessage(++nextPropertyId)
    });
    worker.on("error", (error) => console.log(error));
    worker.on("exit", (code) => {
    console.log(code)
    });
    
    worker.postMessage(nextPropertyId++);    
}