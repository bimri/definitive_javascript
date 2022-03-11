// 7.2 Reading and Writing Array Elements
/*
You access an element of an array using the [] operator. A reference to the array
should appear to the left of the brackets. An arbitrary expression that has a nonnegative
integer value should be inside the brackets. You can use this syntax to both
read and write the value of an element of an array.
*/


let a = ["world"];          // Start with a one-element array
let value = a[0];           // Read element 0
a[1] = 3.14;                // Write element 1
let i = 2;
a[i] = 3;                   // Write element 2
a[i + 1] = "hello";         // Write element 3
a[a[i]] = a[0];             // Read elements 0 and 2, write element 3


/*
It is helpful to clearly distinguish an array index from an object property name. All
indexes are property names, but only property names that are integers between 0 and
232–2 are indexes. All arrays are objects, and you can create properties of any name on
them. If you use properties that are array indexes, however, arrays have the special
behavior of updating their length property as needed.
*/
let o = {};                 // Create a plain object
o[1] = "one";               // Index it with an integer
o["1"]                      // => "one"; numeric and string property names are the same


/*
Note that you can index an array using numbers that are negative or that are not integers.
When you do this, the number is converted to a string, and that string is used as
the property name.

Since the name is not a non-negative integer, it is treated as a regular
object property, not an array index.

Also, if you index an array with a string that
happens to be a non-negative integer, it behaves as an array index, not an object property.
*/
a[-1.23] = true;            // This creates a property named "-1.23"
a["1000"] = 0;              // This the 1001st element of the array
a[1.000] = 1;               // Array index 1. Same as a[1] = 1;


/*
The fact that array indexes are simply a special type of object property name means
that JavaScript arrays have no notion of an “out of bounds” error. When you try to
query a nonexistent property of any object, you don’t get an error; you simply get
undefined. This is just as true for arrays as it is for objects:
*/
let a = [true, false];      // This array has elements at indexes 0 and 1
a[2]                        // => undefined; no element at this index.
a[-1]                       // => undefined; no property with this name.
