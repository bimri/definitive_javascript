// 8.4 Functions as Values

// To understand how functions can be JavaScript data as well as JavaScript syntax
function square(x) { return x*x; }


// understand how functions can be JavaScript data as well as JavaScript syntax
let s = square;
square(4);                                                 // => 16
s(4);                                                      // => 16


// Functions can also be assigned to object properties rather than variables.
let o = {square: function(x) { return x*x; }};              // An object literal
let y = o.square(4);                                        // => 16


// Functions don’t even require names at all
let a = [x => x*x, 20];                                      // An array literal
a[0](a[1]);                                                  // => 400 -- still a legal function invocation expression!


// Using functions as data

// We define some simple functions here
function add(x,y) { return x + y; }
function subtract(x,y) { return x - y; }
function multiply(x,y) { return x * y; }
function divide(x,y) { return x / y; }

// Here's a function that takes one of the preceding functions
// as an argument and invokes it on two operands
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value (2+3) + (4*5):
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));


// For the sake of the example, we implement the simple functions again,
// this time within an object literal;
const operators = {
    add:    (x,y) => x + y,
    subtract: (x,y) => x - y,
    multiply: (x,y) => x * y,
    divide: (x,y) => x / y,
    pow: Math.pow                                          // works for predefined functions too
};


// This function takes the name of an operator, looks up that operator
// in the object, and then invokes it on the supplied operands. Note
// the syntax used to invoke the operator function.
function operate2(operator, operand1, operand2) {
    if (typeof operators[operator] === 'function') {
        return operators[operator](operand1, operand2);
    } else {
        throw new Error(`Unknown operator: ${operator}`);
    }
}
operate2("add", "hello", operate2("add", " ", "world"))     // => "hello world"
operate2("pow", 10, 2)                                      // => 100



// 8.4.1 Defining Your Own Function Properties
// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.

uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
    return uniqueInteger.counter++;                     // return and increment counter property
}
uniqueInteger();                                         // => 0
uniqueInteger();                                         // => 1
uniqueInteger();                                         // => 2


// Compute factorials and cache results as properties of the function itself.
function factorial(n) {
    if (Number.isInteger(n) && n >= 0) {
        if(!(n in factorial)) {
            factorial[n] = n * factorial(n-1);
        }
        return factorial[n];
    } else {
        return NaN;
    }
}
factorial[1] = 1;                                        // initialize the cache to hold this base case
factorial(5);                                            // => 120
factorial(6);                                            // => 720; the call above caches this value
