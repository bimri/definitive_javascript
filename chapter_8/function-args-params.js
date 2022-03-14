// 8.3 Function Arguments and Parameters

// 8.3.1 Optional Parameters and Defaults

// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, a) {
    // a = a || [];                    // idiomatic way:
    if (a === undefined) a = [];
    for (let property in o) a.push(property);    
    return a;
}

// getPropertyNames() can be invoked with one or two arguments:
let o = {x:1}, p= {y:2, z:3};           // Two objects for testing
let a = getPropertyNames(o);            // Get names of o's properties in a new array
getPropertyNames(p, a);                 // ["x", "y", "z"]; add p's properties to a
console.log(a);                         // ["x", "y", "z"]



// 8.3.2 Rest Parameters and Variable-Length Argument Lists
function max(first=-Infinity, ...rest) {
    let maxValue = first;               // Start by assumming the first arg is biggest
    // Then loop through the rest of the arguments, looking for the bigger
    for (let n of rest) {
        if (n > maxValue) {
            maxValue = n;
        }
    }
    // Return the biggest
    return maxValue;
}

console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6));       // 1000



// 8.3.3 The Arguments Object
function max(x) {
    let maxVal = -Infinity;
    // Loop through the arguments object, looking for the biggest
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > maxVal) {
            maxVal = arguments[i];
        }
    }
    // Return the biggest
    return maxVal;
}

console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6));       // 1000



// 8.3.4 The Spread Operator for Function Calls
let numbers = [5, 2, 10, -1, 9, 100, 1];
Math.min(...numbers);                                    // -1

/* When we use the same ... syntax in a function definition rather than a function
invocation, it has the opposite effect to the spread operator. As we saw in §8.3.2,
using ... in a function definition gathers multiple function arguments into an array.
Rest parameters and the spread operator are often useful together */

// This function takes a function and returns a wrapped version
function timed(f) {
    return function(...args) {                          // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            // Pass all of our arguments to the wrapped function
            return f(...args);                          // Spread the args back out again
        }
        finally {
            // Before we return the wrapped return value, log how long it took.
            console.log(`Leaving function ${f.name} after ${Date.now() - startTime}ms`);
        }
    };
}


// Compute the sum of the numbers between 1 and n, by brute force
function benchmark(n){
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
}

// Now invoke the timed version of that test function
timed(benchmark)(1000000);                                // => 



// 8.3.5 Destructuring Function Arguments into Parameters
function vectorAdd(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}

function vectorAdd2([x1, y1], [x2, y2]) {                 // Unpack 2 arguments into 4 parameters
    return [x1 + x2, y1 + y2];
}
vectorAdd2([1, 2], [3, 4]);                              // => [4, 6]   


function vectorMultiply({x, y}, scalar) {
    return {x: x * scalar, y: y * scalar};
}
vectorMultiply({x: 1, y: 2}, 3);                         // => {x: 3, y: 6}


function vectorAdd3(
    {x: x1, y: y1},                                     // Unpack 1st object into x1 and y1 params
    {x: x2, y: y2}                                      // Unpack 2nd object into x2 and y2 params
) {
    return {x: x1 + x2, y: y1 + y2};
}


// define parameter defaults with destructured parameters
// Multiply the vector {x,y} or {x,y,z} by a scalar value
function vectorMultiply1 ({x, y, z=0}, scalar) {
    return {x: x * scalar, y: y * scalar, z: z * scalar};
}
console.log(vectorMultiply1({x: 1, y: 2}, 2));          // => {x: 3, y: 6, z: 0}


function arraycopy({from, to=from, n=from.length, fromIndex=0, toIndex=0}) {
    let valuesToCopy = from.slice(fromIndex, fromIndex + n);
    to.splice(toIndex, 0, ...valuesToCopy);
    return to;
}
let ab = [1, 2, 3, 4, 5], bn = [6, 7, 8, 9, 10];
arraycopy({from: ab, to: bn, n: 3, fromIndex: 1, toIndex: 2});


/*
When you destructure an array, you can define a rest parameter for extra values
within the array that is being unpacked. That rest parameter within the square brackets
is completely different than the true rest parameter for the function:
*/
// This function expects an array argument. The first two elements of that
// array are unpacked into the x and y parameters. Any remaining elements
// are stored in the coords array. And any arguments after the first array
// are packed into the rest array.
function f([x, y, ...coords], ...rest) {
    return [x+y, ...rest, ...coords];               // Note: spread operator here
}
f([1, 2, 3, 4], 5, 6);                              // => [3, 5, 6, 3, 4]])


/*
In ES2018, you can also use a rest parameter when you destructure an object. The
value of that rest parameter will be an object that has any properties that did not get
destructured. Object rest parameters are often useful with the object spread operator,
which is also a new feature of ES2018:
*/
// Multiply the vector {x,y} or {x,y,z} by a scalar value, retain other props
function vectorMultiply({x, y, z=0, ...props}, scalar) {
    return { x: x*scalar, y: y*scalar, z: z*scalar, ...props };
}
vectorMultiply({x: 1, y: 2, w: -1}, 2) // => {x: 2, y: 4, z: 0, w: -1}



// 8.3.6 Argument Types
// Return the sum of the elements an iterable object a.
// The elements of a must all be numbers.

function sum(a) {
    let total = 0;
    for (let element of a) {
        if (typeof element !=='number') {
            throw new Error("sum(): elements must be numbers");
        }
        total += element;
    }
    return total;
}
sum([1,2,3])                            // => 6
sum(1, 2, 3);                           // !TypeError: 1 is not iterable
sum([1,2,"3"]);                         // !TypeError: element 2 is not a number
