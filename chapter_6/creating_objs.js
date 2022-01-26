// 6.2 Creating Objects

/*
Objects can be created with object literals, with the new keyword, and with the
Object.create() function.
*/


// 6.2.1 Object Literals
let empty = {};                                 // An object with no properties
let point = { x: 0, y: 0 };                     // Two numeric properties
let p2 = { x: point.x, y: point.y+1 };          // More complex values
let book = {
    "main title": "JavaScript",                 // These property names include spaces,
    "sub-title": "The Definitive Guide",        // and hyphens, so use string literals.
    for: "all audiences",                       // for is reserved, but no quotes.
        author: {                               // The value of this property is
            firstname: "David",                 // itself an object.
            surname: "Flanagan"
    }
};


// 6.2.2 Creating Objects with new
let o = new Object();                           // Create an empty object: same as {}.
let a = new Array();                            // Create an empty array: same as [].
let d = new Date();                             // Create a Date object representing the current time
let r = new Map();                              // Create a Map object for key/value mapping


// 6.2.3 Prototypes

/*
Almost every JavaScript object has a second JavaScript object
associated with it. This second object is known as a prototype, and the first object
inherits properties from the prototype.

All objects created by object literals have the same prototype object, and we can refer
to this prototype object in JavaScript code as Object.prototype.

Remember: almost all objects have a prototype,
but only a relatively small number of objects have a prototype property. It is
these objects with prototype properties that define the prototypes for all the other
objects.

Object.prototype is one of the rare objects that has no prototype: it does not inherit
any properties. Other prototype objects are normal objects that do have a prototype.
Most built-in constructors (and most user-defined constructors) have a prototype
that inherits from Object.prototype. For example, Date.prototype inherits properties
from Object.prototype, so a Date object created by new Date() inherits properties
from both Date.prototype and Object.prototype. This linked series of
prototype objects is known as a prototype chain.
*/


// 6.2.4 Object.create()

/*
Object.create() creates a new object, using its first argument as the prototype of
that object:

You can pass to create a new object that does not have a prototype null but if you do
this, the newly created object will not inherit anything, not even basic methods like
toString()
*/
let o1 = Object.create({x: 1, y: 2});                   // o1 inherits properties x and y.
o1.x + o1.y                                             // => 3


let o2 = Object.create(null);                           // o2 inherits no props or methods.

// create an ordinary empty object
let o3 = Object.create(Object.prototype);               // o3 is like {} or new Object().


/*
One use for Object.create() is when you want to guard against unintended (but
nonmalicious) modification of an object by a library function that you don’t have
control over. Instead of passing the object directly to the function, you can pass an
object that inherits from it.
*/
let o = { x: "don't change this value"};
library.function(Object.create(o));                     // Guard against acccidental modfifications

