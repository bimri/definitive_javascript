// 16.1 Node Programming Basics

// 16.1.1 Console Output
console.log("Hello World!");

/* In web browsers, console.log(), console.warn(), and console.error() typically
display little icons next to their output in the developer console to indicate the variety
of the log message. */


// 16.1.2 Command-Line Arguments and Environment Variables
/* Node follows these Unix conventions. A Node program can read its command-line
arguments from the array of strings process.argv. The first element of this array is
always the path to the Node executable. The second argument is the path to the file of
JavaScript code that Node is executing. Any remaining elements in this array are the
space-separated arguments that you passed on the command-line when you invoked
Node. */


// 16.1.3 Program Life Cycle
/**
 * The node command expects a command-line argument that specifies the file of Java‐
Script code to be run. This initial file typically imports other modules of JavaScript
code, and may also define its own classes and functions. Fundamentally, however,
Node executes the JavaScript code in the specified file from top to bottom. Some
Node programs exit when they are done executing the last line of code in the file.
Often, however, a Node program will keep running long after the initial file has been
executed. As we’ll discuss in the following sections, Node programs are often asynchronous
and based on callbacks and event handlers. Node programs do not exit
until they are done running the initial file and until all callbacks have been called and
there are no more pending events. A Node-based server program that listens for
incoming network connections will theoretically run forever because it will always be
waiting for more events.

*  A program can force itself to exit by calling process.exit(). Users can usually terminate
a Node program by typing Ctrl-C in the terminal window where the program is
running. A program can ignore Ctrl-C by registering a signal handler function with
process.on("SIGINT", ()=>{}).

* If code in your program throws an exception and no catch clause catches it, the program
will print a stack trace and exit. Because of Node’s asynchronous nature, exceptions
that occur in callbacks or event handlers must be handled locally or not handled
at all, which means that handling exceptions that occur in the asynchronous parts of
your program can be a difficult problem. If you don’t want these exceptions to cause
your program to completely crash, register a global handler function that will be
invoked instead of crashing:
*/
process.setUncaughtExceptionCaptureCallback(e => {
    console.error("Uncaught exception:", e);
});


/* A similar situation arises if a Promise created by your program is rejected and there is
no .catch() invocation to handle it. As of Node 13, this is not a fatal error that
causes your program to exit, but it does print a verbose error message to the console.
In some future version of Node, unhandled Promise rejections are expected to
become fatal errors. If you do not want unhandled rejections, to print error messages
or terminate your program, register a global handler function:
*/
process.on("unhandledRejection", (reason, promise) => {
    // reason is whatever value would have been passed to a .catch() function
    // promise is the Promise object that rejected
});


// 16.1.4 Node Modules
/* Node 13 adds support for standard ES6 modules as well as require-based modules
(which Node calls “CommonJS modules”). The two module systems are not fully
compatible, so this is somewhat tricky to do. Node needs to know—before it loads a
module—whether that module will be using require() and module.exports or if it
will be using import and export. When Node loads a file of JavaScript code as a
CommonJS module, it automatically defines the require() function along with identifiers
exports and module, and it does not enable the import and export keywords.
On the other hand, when Node loads a file of code as an ES6 module, it must enable
the import and export declarations, and it must not define extra identifiers like
require, module, and exports. */


/* The simplest way to tell Node what kind of module it is loading is to encode this
information in the file extension. If you save your JavaScript code in a file that ends
with .mjs, then Node will always load it as an ES6 module, will expect it to use import
and export, and will not provide a require() function. And if you save your code in
a file that ends with .cjs, then Node will always treat it as a CommonJS module, will
provide a require() function, and will throw a SyntaxError if you use import or
export declarations. */


// 16.1.5 The Node Package Manager
