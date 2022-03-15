// 8.8 Functional Programming

// 8.8.1 Processing Arrays with Functions
let data = [1, 2, 3, 5, 5];                 // This is our array of numbers

// The mean is the sum of the elements divided by the number of elements
let total = 0;
for (let i=0; i <data.length; i++) total += data[i];
let mean = total / data.length;             // mean === 3; mean of our data is 3

// To compute the standard deviation, we first sum the squares of 
// the deviation of each element from the mean.
total = 0;
for (let i = 0; i < data.length; i++) {
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total / (data.length - 1));      // stddev == 2


// concise functional style

// First, define two simple functions
const sum = (x, y) => x+y;
const square = x => x*x; 

// Then use those functions with Array methods to compute mean and stddev
let data1 = [1, 1, 3, 5, 5];
let mean1 = data.reduce(sum) / data1.length;            // mean ===3
let deviations = data.map(x => x - mean);  
let stddev1 = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1));
stddev      // => 2


// functional versions of the map() and reduce() methods
const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args); };

const sum2 = (x,y) => x+y;
const square2 = x => x*x;

let data2 = [1,1,3,5,5];
let mean2 = reduce(data, sum2)/data.length;
let deviations2 = map(data, x => x-mean);
let stddev2 = Math.sqrt(reduce(map(deviations, square2), sum2)/(data.length-1));
stddev2 // => 2



// 8.8.2 Higher-Order Functions
/* 
A higher-order function is a function that operates on functions, taking one or more
functions as arguments and returning a new function.
*/

// This higher-order function returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f) {
    return function(...args) {                      // Return a new function
        let result = f.apply(this, args);           // that calls f
        return !result;                             // and negates its result.
    };
}

const even = x => x % 2 === 0;                      // A function to determine if a number is even
const odd = not(even);                              // A new function that does the opposite
[1,1,3,5,5].every(odd)                              // => true: every element of the array is odd


// Return a function that expects an array argument and applies f to
// each element, returning the array of return values.
// Contrast this with the map() function from earlier.
function mapper(f) {
    return a => map(a, f);
}

const increment = x => x+1;
const incrementAll = mapper(increment);
incrementAll([1,2,3])                               // => [2,3,4]


// Return a new function that computes f(g(...)).
// The returned function h passes all of its arguments to g, then passes
// the return value of g to f, then returns the return value of f.
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f, g) {
    return function(...args) {
        // We use call for f because we're passing a single value and
        // apply for g because we're passing an array of values.
        return f.call(this, g.apply*(this, args));
    };
}

const sum3 = (x, y) => x + y;
const square3 = x => x*x;
compose(square3, sum3)(2,3)                     // => 25; the square of the sum



// 8.8.3 Partial Application of Functions

// The arguments to this function are passed on the left
function partialLeft(f, ...outerArgs) {
    return function(...innerArgs) { // Return this function
        let args = [...outerArgs, ...innerArgs]; // Build the argument list
        return f.apply(this, args); // Then invoke f with it
    };
}

// The arguments to this function are passed on the right
function partialRight(f, ...outerArgs) {
    return function(...innerArgs) { // Return this function
        let args = [...innerArgs, ...outerArgs]; // Build the argument list
        return f.apply(this, args); // Then invoke f with it
    };
}

// The arguments to this function serve as a template. Undefined values
// in the argument list are filled in with values from the inner set.
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs]; // local copy of outer args template
        let innerIndex=0; // which inner arg is next
        // Loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}

// Here is a function with three arguments
const f = function(x,y,z) { return x * (y - z); };
// Notice how these three partial applications differ
partialLeft(f, 2)(3,4)                                      // => -2: Bind first argument: 2 * (3 - 4)
partialRight(f, 2)(3,4)                                     // => 6: Bind last argument: 3 * (4 - 2)
partial(f, undefined, 2)(3,4)                               // => -6: Bind middle argument: 3 * (2 - 4)


const increment3 = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1/3);
cuberoot(increment3(26))    // => 3


const not2 = partialLeft(compose, x => !x);
const even4 = x => x % 2 === 0;
const odd4 = not(even4);
const isNumber = not(isNaN);
odd4(3) && isNumber(2)  // => true


// sum() and square() functions are defined above. Here are some more:
const product = (x,y) => x*y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, .5);
const reciprocal = partial(Math.pow, undefined, neg(1));

// Now compute the mean and standard deviation.
let data5 = [1,1,3,5,5]; // Our data
let mean5 = product(reduce(data, sum), reciprocal(data.length));
let stddev5 = sqrt(product(reduce(map(data, compose(square, partial(sum, neg(mean)))), sum), reciprocal(sum(data.length,neg(1)))));
[mean, stddev]  // => [3, 2]



// 8.8.4 Memoization

// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
function memoize(f) {
    const cache = new Map();                    // Value cache stored in the closure.

    return function(...args) {
        // Create a string version of the arguments to use a cache key.
        let key = args.length + args.join("+");
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            let result = f.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}


// Return the Greatest Common Divisor of two integers using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) {                                 // Type checking for a and b has been omitted
    if (a < b) {                                    // Ensure that a >= b when we start
        [a, b] = [b, a];                            // Destructuring assignment to swap variables
    }
    while(b !== 0) {                                // This is Euclid's algorithm for GCD
        [a, b] = [b, a%b];
    }
    return a;
}

const gcdmemo = memoize(gcd);
gcdmemo(85, 187) // => 17

// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
const factorial = memoize(function(n) {
    return (n <= 1) ? 1 : n * factorial(n-1);
});
factorial(5)                                            // => 120: also caches values for 4, 3, 2 and 1.
