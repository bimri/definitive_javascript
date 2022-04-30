// 16.2 Node Is Asynchronous by Default

const fs = require("fs");               // Require the filesystem module

// Read a config file, parse its contents as JSON, and pass the
// resulting value to the callback. If anything goes wrong,
// print an error message to stderr and invoke the callback with null
function readConfigFile(path, callback) {
    fs.readFile(path, "utf8", (err, text) => {
        if (err) {                      // Something went wrong reading the file
            console.error(err);
            callback(null);
            return;
        }
        let data = null;
        try {
            data = JSON.parse(text);
        } catch (e) {                   // Something went wrong parsing the file contents
            console.error(e);
        }
        callback(data);
    });
}

const util = require("util");
const fs = require("fs");               // Require the filesystem module
const pfs = {                           // Promised-based variants of some fs functions
    readFile: util.promisify(fs.readFile)
};

// function readConfigFile(path) {
//     return pfs.readFile(path, "utf-8").then(text => {
//         return JSON.parse(text);
//     });
// }

// simpify the preceding Promise-based function using async and await
async function readConfigFile(path) {
    let text = await pfs.readFile(path, "utf8");
    return JSON.parse(text);
}
