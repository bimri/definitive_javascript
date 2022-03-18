// 10.3 Modules in ES6

/* 
ES6 modules have been in use on the web for years with the help of
code bundlers like webpack, which combine independent modules
of JavaScript code into large, non-modular bundles suitable for
inclusion into web pages. At the time of this writing, however, ES6
modules are finally supported natively by all web browsers other
than Internet Explorer. When used natively, ES6 modules are
added into HTML pages with a special <script type="module">
tag,
*/

// 10.3.1 ES6 Exports
/* To export a constant, variable, function, or class from an ES6 module, simply add the
keyword export before the declaration: */

export const PI = Math.PI;

export function degreesToRadians(d) { return d * PI / 180; }

export class Circle {
    constructor(r) { this.r = r; }
    area()  { return PI * this.r * this.r; }
}


/*
As an alternative to scattering export keywords throughout your module, you can
define your constants, variables, functions, and classes as you normally would, with
no export statement, and then (typically at the end of your module) write a single
export statement that declares exactly what is exported in a single place.
*/
export { Circle, degreesToRadians, PI };



// 10.3.2 ES6 Imports
/* You import values that have been exported by other modules 
with the import keyword. */
import BitSet from './chapter_9/bitset.js';

/*To import values from a module that exports multiple values,
we use a slightly different syntax:*/
import { mean, stddev } from "./stats.js";

// easily import everything with an import statement
import * as stats from "./stats.js";

// import both the default value and the named values with an import statement
import Histogram, { mean, stddev } from "./histogram-stats.js";

// To include a noexports module into your program
import "./analytics.js";



// 10.3.3 Imports and Exports with Renaming
/* import a value whose name is already in use in
your module, you will need to rename the imported value. */
import { render as renderImage } from "./imageutils.js";
import { render as renderUI } from "./ui.js";

// import both the default and named exports
import { default as Histogram, mean, stddev } from "./histogram-stats.js";

// possible to rename values as you export them

export {
    layout as calculateLayout,
    render as renderLayout
};



// 10.3.4 Re-Exports
// implementations are now in separate files
import { mean } from "./stats/mean.js";
import { stddev } from "./stats/stddev.js";
export { mean, stdev };

/* importing a symbol simply to export it again, you can combine the import and the
export steps into a single “re-export” statement */
export { mean } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";

// wildcard: - xport all of the named values from another module
export * from "./stats/mean.js";
export * from "./stats/stddev.js";

/* re-export the mean() function but also define
average() as another name for the function */
export { mean, mean as average } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";

/* All of the re-exports in this example assume that the “./stats/mean.js” and “./stats/
stddev.js” modules export their functions using export instead of export default. In
fact, however, since these are modules with only a single export, it would have made
sense to define them with export default. */
export { default as mean } from "./stats/mean.js";
export { default as stddev } from "./stats/stddev.js";


/* If you want to re-export a named symbol from another module as the default export
of your module, you could do an import followed by an export default, or you
could combine the two statements like this: */
// Import the mean() function from ./stats.js and make it the
// default export of this module
// export { mean as default } from "./stats.js"


// re-export the default export of another module as the default export of your module
// The average.js module simply re-exports the stats/mean.js default export
// export { default } from "./stats/mean.js"
