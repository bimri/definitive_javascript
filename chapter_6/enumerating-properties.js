// 6.6 Enumerating Properties

/* 
Built-in methods that objects inherit are not enumerable,
but the properties that your code adds to objects are enumerable by default.
*/

let o = { x: 1, y: 2, z: 3 };                           // Three enumerable own properties
o.propertyIsEnumerable("toString")                      // => false: toString is not enumerable
for (let p in o) {                                      // => "x", "y", "z"; Loop through the properties
    console.log(p);                                     // Prints x, y, z, but not toString
}

/*
To guard against enumerating inherited properties with for/in, you can add an
explicit check inside the loop body:
*/

for(let p in o) {
    if (!o.hasOwnProperty(p)) continue;                 // Skip inherited properties
    console.log(p);                                     // Prints x, y, z
}


for (let p in o) {
    if (typeof o[p] === "function") continue;           // Skip all methods
}
