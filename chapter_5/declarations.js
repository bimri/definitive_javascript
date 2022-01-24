// 5.7 Declarations

/* 
The keywords const, let, var, function, class, import, and export are not technically
statements, but they look a lot like statements.

These keywords are more accurately described as declarations rather than statements.
We said at the start of this chapter that statements “make something happen.” Declarations
serve to define new values and give them names that we can use to refer to
those values.
*/

// 5.7.1 const, let, and var

/* 
The const, let, and var declarations are covered in §3.10. In ES6 and later, const
declares constants, and let declares variables.

Prior to ES6, the var keyword was the
only way to declare variables and there was no way to declare constants. Variables
declared with var are scoped to the containing function rather than the containing
block. This can be a source of bugs, and in modern JavaScript there is really no reason
to use var instead of let.
*/

const TAU = 2*Math.PI;
let radius = 3;
var circumference = TAU * radius;


// 5.7.2 function

/*
The function declaration is used to define functions
*/

function area(radius) {
    return Math.PI * radius * radius;
}


// 5.7.3 class

/* 
the class declaration creates a new class and gives it a name that we
can use to refer to it.

Unlike functions, class declarations are not hoisted, and you cannot use a class
declared this way in code that appears before the declaration.
*/

class Circle {
    constructor(radius) { this.r = radius; }
    area() { return Math.PI * this.r * this.r; }
    circumference() { return 2 * Math.PI * this.r; }
}


// 5.7.4 import and export

/*
The import and export declarations are used together to make values defined in one
module of JavaScript code available in another module. A module is a file of Java‐
Script code with its own global namespace, completely independent of all other modules.
*/
import Circle from './geometry/circle.js';
import { PI, TAU } from './geometry/constants.js';
import { magnitude as hypotenuse } from './vectors/utils.js';

/*
Values within a JavaScript module are private and cannot be imported into other
modules unless they have been explicitly exported.
*/
// geometry/constants.js
const PI = Math.PI;
const TAU = 2 * PI;
export { PI, TAU };

/*
The export keyword is sometimes used as a modifier on other declarations, resulting
in a kind of compound declaration that defines a constant, variable, function, or class
and exports it at the same time.
*/
export const TAU = 2 * Math.PI;
export function magnitude(x,y) { return Math.sqrt(x*x + y*y); }
export default class Circle { /* class definition omitted here */ }
