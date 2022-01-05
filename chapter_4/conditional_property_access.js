"Conditional Property Access"

/*
expression ?. identifier
expression ?.[ expression ]

In JavaScript, the values null and undefined are the only two values that do not have
properties.

In a regular property access expression using . or [], you get a TypeError
if the expression on the left evaluates to null or undefined. 

You can use ?. and ?.[] syntax to guard against errors of this type.
*/

let a = { b: null };
a.b?.c.d                // => undefined; “optional chaining

let a = { b: {} };
a.b?.c?.d               // => undefined

// property access with ?. is “short-circuiting”:


// Conditional property access is also possible using ?.[] instead of [].
let a;                  // Oops, we forgot to initialize this variable!
let index = 0;

try {
    a[index++];             // Throws TypeError
    } catch(e) {
        index           // => 1: increment occurs before TypeError is thrown
}

a?.[index++]            // => undefined: because a is undefined
index                   // => 1: not incremented because ?.[] short-circuits
a[index++]              // !TypeError: can't index undefined.
