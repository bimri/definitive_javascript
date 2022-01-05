"The instanceof Operator"

let d = new Date();             // Create a new object with the Date() constructor
d instanceof Date               // => true: d was created with Date()
d instanceof Object             // => true: all objects are instances of Object
d instanceof Number             // => false: d is not a Number object

let a = [1, 2, 3];              // Create an array with array literal syntax
a instanceof Array              // => true: a is an array
a instanceof Object             // => true: all arrays are objects
a instanceof RegExp             // => false: arrays are not regular expressions
