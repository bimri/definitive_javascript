"Object and Array Initializers"

x = []              // An empty array: no expressions inside brackets means no elements
[1+2,3+4]           // A 2-element array. First element is 3, second is 7

/*
The element expressions in an array initializer can themselves be array initializers,
which means that these expressions can create nested arrays:
*/
let matrix = [[1,2,3], [4,5,6], [7,8,9]];       

/*
Undefined elements can be included in an array literal by simply omitting a value
between commas.
*/
let sparseArray = [1,,,,5];

/*
Object initializer expressions are like array initializer expressions, but the square
brackets are replaced by curly brackets, and each subexpression is prefixed with a
property name and a colon:
*/
let p = { x: 2.3, y: -1.2 };        // An object with 2 properties
let q = {};                         // An empty object with no properties
q.x = 2.3; q.y = -1.2;              // Now q has the same properties as p

// Object literals can be nested.
let rectangle = {
    upperLeft: { x: 2, y: 2 },
    lowerRight: { x: 4, y: 5 }
    };
