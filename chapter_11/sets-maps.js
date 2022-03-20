// 11.1 Sets and Maps

// 11.1 Sets and Maps
/* Create a Set object with the Set() constructor: */
let j = new Set();          // A new, empty set
let t = new Set([1, j]);    // A new set with two members


/* The argument to the Set() constructor need not be an array: any iterable object
(including other Set objects) is allowed: */
let u = new Set(j);                     // A new set that copies the elements of s.
let unique = new Set("Mississippi");    // 4 elements: "M", "i", "s", and "p"

unique.size                             // => 4


/* 
Sets don’t need to be initialized when you create them. You can add and remove elements
at any time with add(), delete(), and clear(). Remember that sets cannot
contain duplicates, so adding a value to a set when it already contains that value has
no effect:
*/
let s = new Set();              // Start empty
s.size                          // => 0
s.add(1);                       // Add a number
s.size                          // => 1; now the set has one member
s.add(1);                       // Add the same number again
s.size                          // => 1; the size does not change
s.add(true);                    // Add another value; note that it is fine to mix types
s.size                          // => 2
s.add([1,2,3]);                 // Add an array value
s.size                          // => 3; the array was added, not its elements
s.delete(1)                     // => true: successfully deleted element 1
s.size                          // => 2: the size is back down to 2
s.delete("test")                // => false: "test" was not a member, deletion failed
s.delete(true)                  // => true: delete succeeded
s.delete([1,2,3])               // => false: the array in the set is different
s.size                          // => 1: there is still that one array in the set
s.clear();                      // Remove everything from the set
s.size                          // => 0

/* In practice, the most important thing we do with sets is not to add and remove elements
from them, but to check to see whether a specified value is a member of the
set. We do this with the has() method: */
let oneDigitPrimes = new Set([2,3,5,7]);
oneDigitPrimes.has(2)           // => true: 2 is a one-digit prime number
oneDigitPrimes.has(3)           // => true: so is 3
oneDigitPrimes.has(4)           // => false: 4 is not a prime
oneDigitPrimes.has("5")         // => false: "5" is not even a number

// The most important thing to understand about sets is that they are optimized for
// membership testing, and no matter how many members the set has, the has()
// method will be very fast. The includes() method of an array also performs membership
// testing, but the time it takes is proportional to the size of the array, and using an
// array as a set can be much, much slower than using a real Set object.
let sum = 0;
for (let p of oneDigitPrimes) {
    sum += p;
}
sum                             // => 17: 2 + 3 + 5 + 7

// Because Set objects are iterable, you can convert them to arrays and argument lists
// with the ... spread operator:
// [...oneDigitPrimes] // => [2,3,5,7]: the set converted to an Array
// Math.max(...oneDigitPrimes) // => 7: set elements passed as function arguments          


/* 
Sets are often described as “unordered collections.” This isn’t exactly true for the Java‐
Script Set class, however. A JavaScript set is unindexed: you can’t ask for the first or
third element of a set the way you can with an array.

But the JavaScript Set class always remembers the order that elements were inserted in, and it always uses this
order when you iterate a set: the first element inserted will be the first one iterated
(assuming you haven’t deleted it first), and the most recently inserted element will be
the last one iterated.
*/

// Set class also implements a method forEach()
let product = 1;
oneDigitPrimes.forEach(n => { product *= n; });
product                         // => 210: 2 * 3 * 5 * 7



// 11.1.2 The Map Class
/* Create a new map with the Map() constructor: */
let me = new Map();                     // Create a new, empty map
let ne = new Map(                       // A new map initialized with string keys mapped to numbers
    [
        ["one", 1],
        ["two", 2]
    ]
);


/* The optional argument to the Map() constructor should be an iterable object that
yields two element [key, value] arrays. In practice, this means that if you want to
initialize a map when you create it, you’ll typically write out the desired keys and
associated values as an array of arrays. But you can also use the Map() constructor to
copy other maps or to copy the property names and values from an existing object: */
let copy = new Map(ne);                     // A new map with the same keys and values as map ne
let o = { x: 1, y: 2};                      // An object with two properties
let p = new Map(Object.entries(o));         // Same as new map([["x", 1], ["y", 2]])


/*
Once you have created a Map object, you can query the value associated with a given
key with get() and can add a new key/value pair with set().
that a map is a set of keys, each of which has an associated value. This is not quite the
same as a set of key/value pairs. If you call set() with a key that already exists in the
map, you will change the value associated with that key, not add a new key/value
mapping. In addition to get() and set(), the Map class also defines methods that are
like Set methods: use has() to check whether a map includes the specified key; use
delete() to remove a key (and its associated value) from the map; use clear() to
remove all key/value pairs from the map; and use the size property to find out how
many keys a map contains.
*/
let m = new Map();                      // Start with an empty map
m.size                                  // => 0: empty maps have no keys
m.set("one", 1);                        // Map the key "one" to the value 1
m.set("two", 2);                        // And the key "two" to the value 2.
m.size                                  // => 2: the map now has two keys
m.get("two")                            // => 2: return the value associated with key "two"
m.get("three")                          // => undefined: this key is not in the set
m.set("one", true);                     // Change the value associated with an existing key
m.size                                  // => 2: the size doesn't change
m.has("one")                            // => true: the map has a key "one"
m.has(true)                             // => false: the map does not have a key true
m.delete("one")                         // => true: the key existed and deletion succeeded
m.size                                  // => 1
m.delete("three")                       // => false: failed to delete a nonexistent key
m.clear();                              // Remove all keys and values from the map


// Like the add() method of Set, the set() method of Map can be chained, which allows
// maps to be initialized without using arrays of arrays:
let k = new Map().set("one", 1).set("two", 2).set("three", 3);
k.size                                  // => 3
k.get("two")                            // => 2


/*
As with Set, any JavaScript value can be used as a key or a value in a Map. This
includes null, undefined, and NaN, as well as reference types like objects and arrays.
And as with the Set class, Map compares keys by identity, not by equality, so if you
use an object or array as a key, it will be considered different from every other object
and array, even those with exactly the same properties or elements:
*/
let f = new Map();              // Start with an empty map.
f.set({}, 1);                   // Map one empty object to the number 1.
f.set({}, 2);                   // Map a different empty object to the number 2.
f.size                          // => 2: there are two keys in this map
f.get({})                       // => undefined: but this empty object is not a key
f.set(f, undefined);            // Map the map itself to the value undefined.
f.has(f)                        // => true: f is a key in itself
f.get(f)                        // => undefined: same value we'd get if f wasn't a key


// Map objects are iterable
let g = new Map([["x", 1], ["y", 2]]);
[...g]                          // => [["x", 1], ["y", 2]]

for(let [key, value] of g) {
    // On the first iteration, key will be "x" and value will be 1
    // On the second iteration, key will be "y" and value will be 2
}

/* If you want to iterate just the keys or just the associated values of a map, use the
keys() and values() methods: these return iterable objects that iterate keys and values,
in insertion order. (The entries() method returns an iterable object that iterates
key/value pairs, but this is exactly the same as iterating the map directly.)

    [...g.keys()] // => ["x", "y"]: just the keys
    [...g.values()] // => [1, 2]: just the values
    [...g.entries()] // => [["x", 1], ["y", 2]]: same as [...g]

Map objects can also be iterated using the forEach() method that was first implemented
by the Array class.

    m.forEach((value, key) => { // note value, key NOT key, value
        On the first invocation, value will be 1 and key will be "x"
        // On the second invocation, value will be 2 and key will be "y"
    });
*/
