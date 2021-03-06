"Conditional Invocation"
// In ES2020, you can also invoke a function using ?.() instead of ().
/*
With the new ?.() invocation
syntax, if the expression to the left of the ?. evaluates to null or undefined, then
the entire invocation expression evaluates to undefined and no exception is thrown.
*/


function square(x, log) {               // The second argument is an optional function
    if (log) {                          // If the optional function is passed
    log(x);                             // Invoke it
    }
    return x * x;                       // Return the square of the argument
}

/*
With this conditional invocation syntax of ES2020, however, you can simply write the
function invocation using ?.(), knowing that invocation will only happen if there is
actually a value to be invoked:
*/
function square(x, log) {               // The second argument is an optional function
    log?.(x);                           // Call the function if there is one
    return x * x;                       // Return the square of the argument
}


/*
Like conditional property access expressions, function invocation with ?.()
is short-circuiting: if the value to the left of ?. is null or undefined, then none of the
argument expressions within the parentheses are evaluated:
*/
let f = null, x = 0;
try {
    f(x++);                     // Throws TypeError because f is null
} catch(e) {
    x                           // => 1: x gets incremented before the exception is thrown
}
f?.(x++)                        // => undefined: f is null, but no exception thrown
x                               // => 1: increment is skipped because of short-circuiting


/*
Conditional invocation expressions with ?.() work just as well for methods as they
do for functions.
*/
o.m()                   // Regular property access, regular invocation
o?.m()                  // Conditional property access, regular invocation
o.m?.()                 // Regular property access, conditional invocation

/*
In the first expression, o must be an object with a property m and the value of that
property must be a function. In the second expression, if o is null or undefined, then
the expression evaluates to undefined. But if o has any other value, then it must have
a property m whose value is a function. And in the third expression, o must not be
null or undefined. If it does not have a property m, or if the value of that property is
null, then the entire expression evaluates to undefined.
*/
