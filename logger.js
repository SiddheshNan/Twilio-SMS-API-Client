const tracer = require("tracer");
const PID = process.pid;
const logLevel = 'debug';


const logger = tracer.console({
    level: logLevel,
    format: [
        `{{timestamp}} | {{file}}:{{line}}  [{{title}}] {{message}}`, //default format
        {
            error: `{{timestamp}} | {{file}}:{{line}}  [{{title}}] {{message}}\nError Call Stack:\n{{stack}}`, // error format
        },
    ],
    dateformat: "dd/mm/yyyy hh:MM:ss TT",
    preprocess: (data) => {
        data.title = data.title.toUpperCase();
    },
    transport: (data) => {
        console.log(data.output);
        // fileStream.write(data.rawoutput + "\n");
    },
});

module.exports = { logger };