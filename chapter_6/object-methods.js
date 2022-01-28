// 6.9 Object Methods

/* 
These inherited properties are primarily methods, and because they are universally available, they are of particular
interest to JavaScript programmers.
*/


// 6.9.1 The toString() Method

/* 
The toString() method takes no arguments; it returns a string that somehow represents
the value of the object on which it is invoked. JavaScript invokes this method of
an object whenever it needs to convert the object to a string.
*/

let s = { x: 1, y: 1 }.toString();                      // s == "[object Object]"


let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }
};
String(point)                                           // => "(1, 2)": toString() is used for string conversions


// 6.9.2 The toLocaleString() Method

/* 
In addition to the basic toString() method, objects all have a toLocaleString().
The purpose of this method is to return a localized string representation of the object.
The default toLocaleString() method defined by Object doesn’t do any localization
itself: it simply calls toString() and returns that value. The Date and Number classes
define customized versions of toLocaleString() that attempt to format numbers,
dates, and times according to local conventions. Array defines a toLocaleString()
method that works like toString() except that it formats array elements by calling
their toLocaleString() methods instead of their toString() methods.
*/

let point = {
    x: 1000,
    y: 2000,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toLocaleString: function() {
        return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
    }
};
point.toString()                                                // => "(1000, 2000)"
point.toLocaleString()                                          // => "(1,000, 2,000)": note thousands separators


// 6.9.3 The valueOf() Method

/*
The valueOf() method is much like the toString() method, but it is called when
JavaScript needs to convert an object to some primitive type other than a string—
typically, a number. JavaScript calls this method automatically if an object is used in a
context where a primitive value is required. The default valueOf() method does
nothing interesting, but some of the built-in classes define their own valueOf()
method. The Date class defines valueOf() to convert dates to numbers, and this
allows Date objects to be chronologically compared with < and >.
*/

let point = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y); }
};
Number(point)           // => 5: valueOf() is used for conversions to numbers
point > 4               // => true
point > 5               // => false
point < 6               // => true


// 6.9.4 The toJSON() Method

/*
Object.prototype does not actually define a toJSON() method, but the JSON.string
ify() method looks for a toJSON() method on any object it is asked to
serialize. If this method exists on the object to be serialized, it is invoked, and the
return value is serialized, instead of the original object. The Date class defines
a toJSON() method that returns a serializable string representation of the date.
*/

let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};
JSON.stringify([point])             // => '["(1, 2)"]'
