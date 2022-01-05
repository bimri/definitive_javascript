"The in Operator"
 

let point = {x: 1, y: 1};               // Define an object
"x" in point                            // => true: object has property named "x"
"z" in point                            // => false: object has no "z" property.
"toString" in point                     // => true: object inherits toString method
let data = [7,8,9];                     // An array with elements (indices) 0, 1, and 2
"0" in data                             // => true: array has an element "0"
1 in data                               // => true: numbers are converted to strings
3 in data                               // => false: no element 3
