// 7.9 Array-Like Objects
let a = {};                     // Start with a regular empty object

// Add properties to make it "array-like"
let i = 0;
while(i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;

// Now iterate through it as if it were a real array
let total = 0;
for(let j = 0; j < a.length; j++) {
    total += a[j];
}


// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded
// with an additional o.nodeType !== 3 test.
function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === "object" &&            // o is an object
        Number.isFinite(o.length) &&        // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        Number.isInteger(o.length) &&       // o.length is an integer
        o.length < 4294967295) {            // o.length < 2^32 - 1
        return true;                        // Then o is array-like.
    } else {
        return false;                       // Otherwise it is not.
    }
}


/*
Most JavaScript array methods are purposely defined to be generic so that they work
correctly when applied to array-like objects in addition to true arrays. Since array-like
objects do not inherit from Array.prototype, you cannot invoke array methods on
them directly. You can invoke them indirectly using the Function.call method,
*/
let a = {"0": "a", "1": "b", "2": "c", length: 3};  // An array-like object
Array.prototype.join.call(a, "+")                   // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase())   // => ["A","B","C"]
Array.prototype.slice.call(a, 0)                    // => ["a","b","c"]: true array copy
Array.from(a)                                       // => ["a","b","c"]: easier array copy
