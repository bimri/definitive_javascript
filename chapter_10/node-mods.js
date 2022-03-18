// 10.2 Modules in Node

/* 
Node modules import other modules with the require() function and export their
public API by setting properties of the Exports object or by replacing the
module.exportsobject entirely.
*/

// 10.2.1 Node Exports
const sum = (x, y) => x + y;
const square = x => x * x;

exports.mean = data => data.reduce(sum)/data.length;
exports.stddev = function(d) {
    let m = exports.mean(d);
    return Math.sqrt(d,map(x => x - m).map(square).reduce(sum)/(d.length-1));
};


/* 
Often, however, you want to define a module that exports only a single function or
class rather than an object full of functions or classes. To do this, you simply assign
the single value you want to export to module.exports:
*/

module.exports = class BitSet extends AbstractWritableSet {
    // implementation omitted
};


/*
The default value of module.exports is the same object that exports refers to. In the
previous stats module, we could have assigned the mean function to
module.exports.mean instead of exports.mean. Another approach with modules like
the stats module is to export a single object at the end of the module rather than
exporting functions one by one as you go:
*/

// Define all the functions, public and private
const sum1 = (x, y) => x + y;
const square1 = x => x * x;

const mean1 = data => data.reduce(sum1)/data.length;
const stddev1 = d => {
    let m = mean1(d);
    return Math.sqrt(d.map(x => x - m).map(square1).reduce(sum)/(d.length-1));
};

// Now export only the public ones
module.exports = { mean1, stddev1 };



// 10.2.2 Node Imports

// These modules are built in to Node
const fs = require("fs");               // The built-in filesystem module
const http = require("http");           // The built-in HTTP module

// The Express HTTP server framework is a third-party module.
// It is not part of Node but has been installed locally
const express = require("express");


/* 
When you want to import a module of your own code, the module name should be
the path to the file that contains that code, relative to the current module’s file. It is
legal to use absolute paths that begin with a / character, but typically, when importing
modules that are part of your own program, the module names will begin with ./ or
sometimes ../ to indicate that they are relative to the current directory or the parent
directory.

(You can also omit the .js suffix on the files you’re importing and Node will still find
the files, but it is common to see these file extensions explicitly included.)
*/
const mod_classes = require('./modules-classes');
const subclasses = require('./chapter_9/subclasses.js');


/*
When a module exports just a single function or class, all you have to do is require it.
When a module exports an object with multiple properties, you have a choice: you
can import the entire object, or just import the specific properties (using destructuring
assignment) of the object that you plan to use.
*/
// Import the entire stats object, with all of its functions
const stats = require('./stats.js');

// We've got more functions than we need, but they're neatly
// organized into a convenient "stats" namespace.
let average = stats.mean(data);

// Alternatively, we can use idiomatic destructuring assignment to import
// exactly the functions we want directly into the local namespace:
const { stddev } = require('./stats.js');

// This is nice and succinct, though we lose a bit of context
// without the 'stats' prefix as a namspace for the stddev() function.
let sd = stddev(data);



// 10.2.3 Node-Style Modules on the Web
/* 
Modules with an Exports object and a require() function are built in to Node. But if
you’re willing to process your code with a bundling tool like webpack, then it is also
possible to use this style of modules for code that is intended to run in web browsers.
*/
