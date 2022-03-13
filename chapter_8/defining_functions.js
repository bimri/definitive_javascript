// 8.1 Defining Functions
/*
The most straightforward way to define a JavaScript function is with the function
keyword.
functions can also be defined with the constructor Function()
*/


// 8.1.1 Function Declarations
// Print the name and value of each property of o. Return undefined.
function printProps(o) {
    for (let p in o) {
        console.log(`${p}: ${o[p]}\n`);
    }
}


// Compute the distance between Cartesian points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {
    if (x <= 1) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}



// 8.1.2 Function Expressions
// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
const square = function (x) {
    return x * x;
};

// Function expressions can include names, which is useful for recursion.
const f = function factorial(x) {
    if (x <= 1) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}

// Function expressions can also be used as arguments to other functions:
[3,2,1].sort(function(x,y) {
    return x - y;
});

// Function expressions are sometimes defined and immediately invoked:
let tensquared = function(x) {
    return x * x;
}(10);  


/*
There is an important difference between defining a function f() with a function
declaration and assigning a function to the variable f after creating it as an expression.
When you use the declaration form, the function objects are created before the
code that contains them starts to run, and the definitions are hoisted so that you can
call these functions from code that appears above the definition statement. This is not
true for functions defined as expressions, however: these functions do not exist until
the expression that defines them are actually evaluated. Furthermore, in order to
invoke a function, you must be able to refer to it, and you can’t refer to a function
defined as an expression until it is assigned to a variable, so functions defined with
expressions cannot be invoked before they are defined.
*/



// 8.1.3 Arrow Functions
/*
The function
keyword is not used, and, since arrow functions are expressions instead of statements,
there is no need for a function name, either.
*/
const sum = (x, y) => { return x + y; };

/* But arrow functions support an even more compact syntax. If the body of the function
is a single return statement, you can omit the return keyword, the semicolon
that goes with it, and the curly braces, and write the body of the function as the
expression whose value is to be returned: */
const summ = (x, y) => x + y;

/* Furthermore, if an arrow function has exactly one parameter, you can omit the
parentheses around the parameter list: */
const polynomial = x => x*x + 2*x + 3;

/* Note, however, that an arrow function with no arguments at all must be written with
an empty pair of parentheses: */
const constantFunc = () => 42;

/* Also, if the body of your arrow function is a single return statement but the expression
to be returned is an object literal, then you have to put the object literal inside
parentheses to avoid syntactic ambiguity between the curly braces of a function body
and the curly braces of an object literal: */
const fh = x => { return { value: x }; };            // Good: f() returns an object
const g = x => ({ value: x });                      // Good: g() returns an object
const h = x => { value: x };                        // Bad: h() returns nothing
// const i = x => { v: x, w: x };                      // Bad: Syntax Error



// 8.1.4 Nested Functions
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}
