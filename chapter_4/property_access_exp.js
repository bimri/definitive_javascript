"Property Access Expressions"

/*
A property access expression evaluates to the value of an object property or an array
element.

expression . identifier
expression [ expression ]
*/

let o = {x: 1, y: {z: 3}};                  // An example object
let a = [o, 4, [5, 6]];                     // An example array that contains the object
o.x                                         // => 1: property x of expression o
o.y.z                                       // => 3: property z of expression o.y
o["x"]                                      // => 1: property x of object o
a[1]                                        // => 4: element at index 1 of expression a
a[2]["1"]                                   // => 6: element at index 1 of expression a[2]
a[0].x                                      // => 1: property x of expression a[0]
