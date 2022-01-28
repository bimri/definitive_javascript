// 6.10 Extended Object Literal Syntax

// 6.10.1 Shorthand Properties
let x = 1, y = 2;
let o = {
    x: x,
    y: y
};

/*
In ES6 and later, you can drop the colon and one copy of the identifier and end up
with much simpler code:
*/
let x = 1, y = 2;
let o = { x, y };
o.x + o.y                       // => 3


// 6.10.2 Computed Property Names
const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let o = {};
o[PROPERTY_NAME] = 1;
o[computePropertyName()] = 2;

/* 
It is much simpler to set up an object like this with an ES6 feature known as computed
properties that lets you take the square brackets from the preceding code and move
them directly into the object literal:
*/
const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let p = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};
p.p1 + p.p2                                 // => 3


// 6.10.3 Symbols as Property Names

/*
In ES6 and later, property names can be strings or symbols. If you assign a symbol
to a variable or constant, then you can use that symbol as a property name using
the computed property syntax:
*/

const extension = Symbol("my extension symbol");
let o = {
    [extension]: { /* extension data stored in this object */ }
};
o[extension].x = 0;                         // This won't conflict with other properties of o


// 6.10.4 Spread Operator

/*
you can copy the properties of an existing object into a new
object using the “spread operator” ... inside an object literal:
*/

let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
rect.x + rect.y + rect.width + rect.height      // => 175


/*
If the object that is spread and the object it is being spread into both have a property
with the same name, then the value of that property will be the one that comes last:
*/

let o = { x: 1 };
let p = { x: 0, ...o };
p.x                                             // => 1: the value from object o overrides the initial value
let q = { ...o, x: 2 };
q.x                                             // => 2: the value 2 overrides the previous value from o.


/*
Also note that the spread operator only spreads the own properties of an object, not
any inherited ones:
*/
let o = Object.create({x: 1});                  // o inherits the property x
let p = { ...o };
p.x                                             // => undefined


// 6.10.5 Shorthand Methods
let square = {
    area: function() { return this.side * this.side; },
    side: 10
};
square.area()                                   // => 100

/*
In ES6, however, the object literal syntax has been extended to allow a shortcut where the function keyword and
the colon are omitted, resulting in code like this:

The shorthand syntax makes it clearer that area() is a method and not a data property like
side.
*/
let square = {
    area() { return this.side * this.side; },
    side: 10
};
square.area()                                   // => 100


/* 
When you write a method using this shorthand syntax, the property name can take
any of the forms that are legal in an object literal: in addition to a regular JavaScript
identifier like the name area above, you can also use string literals and computed
property names, which can include Symbol property names:
*/

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NAME](x) { return x + 2; },
    [symbol](x) { return x + 3; }
};
weirdMethods["method With Spaces"](1)           // => 2
weirdMethods[METHOD_NAME](1)                    // => 3
weirdMethods[symbol](1)                         // => 4


// 6.10.6 Property Getters and Setters
let o = {
    // An ordinary data property
    dataProp: value,
    
    // An accessor property defined as a pair of functions.
    get accessorProp() { return this.dataProp; },
    set accessorProp(value) { this.dataProp = value; }
};


/*
Accessor properties are defined as one or two methods whose name is the same as the
property name. These look like ordinary methods defined using the ES6 shorthand
except that getter and setter definitions are prefixed with get or set. (In ES6, you can
also use computed property names when defining getters and setters. Simply replace
the property name after get or set with an expression in square brackets.)
*/
let p = {
    // x and y are regular read-write data properties.
    x: 1.0,
    y: 1.0,
    
    // r is a read-write accessor property with getter and setter.
    // Don't forget to put a comma after accessor methods.
    get r() { return Math.hypot(this.x, this.y); },
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    // theta is a read-only accessor property with getter only.
    get theta() { return Math.atan2(this.y, this.x); }
};
p.r                                     // => Math.SQRT2
p.theta                                 // => Math.PI / 4


/*
Accessor properties are inherited, just as data properties are, so you can use the object
p defined above as a prototype for other points. You can give the new objects their
own x and y properties, and they’ll inherit the r and theta properties:
*/
let q = Object.create(p);               // A new object that inherits getters and setters
q.x = 3; q.y = 4;                       // Create q's own data properties
q.r                                     // => 5: the inherited accessor properties work
q.theta                                 // => Math.atan2(4, 3)


/*
The code above uses accessor properties to define an API that provides two representations
(Cartesian coordinates and polar coordinates) of a single set of data. Other
reasons to use accessor properties include sanity checking of property writes and
returning different values on each property read:
*/
// This object generates strictly increasing serial numbers
const serialnum = {
    // This data property holds the next serial number.
    // The _ in the property name hints that it is for internal use only.
    _n: 0,
    
    // Return the current value and increment it
    get next() { return this._n++; },
    
    // Set a new value of n, but only if it is larger than current
    set next(n) {
        if (n > this._n) this._n = n;
        else throw new Error("serial number can only be set to a larger value");
    }
};
serialnum.next = 10;                    // Set the starting serial number
serialnum.next                          // => 10
serialnum.next                          // => 11: different value each time we get next


// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
const random = {
    get octet() { return Math.floor(Math.random()*256); },
    get uint16() { return Math.floor(Math.random()*65536); },
    get int16() { return Math.floor(Math.random()*65536)-32768; }
};
