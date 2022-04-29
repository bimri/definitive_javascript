// 15.13 Worker Threads and Messaging

// 15.13.1 Worker Objects
let dataCruncher = new Worker('utils/cruncher.js');

/* Once you have a Worker object, you can send data to it with postMessage(). */
dataCruncher.postMessage('/api/data/to/crunch');

/* You can receive messages from a worker by listening
for “message” events on the Worker object: */
dataCruncher.onmessage = function (e) {
    let stats = e.data;                     // The message is the data property of the event
    console.log(`Average: ${stats.mean}`);
}


// 15.13.2 The Global Object in Workers
/* Workers were defined in web browsers before JavaScript had a module system, so
workers have a unique system for including additional code. WorkerGlobalScope
defines importScripts() as a global function that all workers have access to: */

// Before we start working, load the classes and utilities we'll need
importScripts("utils/Histogram.js", "utils/BitSet.js");


// 15.13.4 Worker Execution Model
"Errors in Workers"
// Handle uncaught worker errors with a handler inside the worker.
self.onerror = function(e) {
    console.log(`Error in worker at ${e.filename}:${e.lineno}:${e.message}`);
    e.preventDefault();
};

// Or, handle uncaught worker errors with a handler outside the worker.
worker.onerror = function(e) {
    console.log(`Error in worker at ${e.filename}:${e.lineno}: ${e.message}`);
    e.preventDefault();
};


// 15.13.5 postMessage(), MessagePorts, and MessageChannels
let channel = new MessageChannel;               // Create a new channel.
let myPort  = channel.port1;                    // It has two parts
let yourPort = channel.port2;                   // connected to each other.

myPort.postMessage("Can you hear me?");         // A message posted to one will
yourPort.onmessage = (e) => console.log(e.data);    // be received on the other.


/* Suppose you have created a worker and
want to have two channels for communicating with it: one channel for ordinary data
exchange and one channel for high-priority messages. In the main thread, you might
create a MessageChannel, then call postMessage() on the worker to pass one of the
MessagePorts to it: */
let worker = new Worker("worker.js");
let urgentChannel = new MessageChannel();
let urgentPort = urgentChannel.port1;
worker.postMessage({command: "setUrgentPort", value: urgentChannel.port2 }, 
                            [urgentChannel.port2]);

// Now we can receive urgent messages from the worker like this
urgentPort.addEventListener("message", handleUrgentMessage);
urgentPort.start();         // Start receiveing messages
// And send urgent messages like this
urgentPort.postMessage("test");
