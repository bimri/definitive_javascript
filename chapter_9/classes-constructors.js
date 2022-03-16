// 9.2 Classes and Constructors

// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    this.from = from;
    this.to = to;
}

// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype = {
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <= this.to; },
    
    // A generator function that makes instances of the class iterable.
    // Note that it only works for numeric ranges.
    [Symbol.iterator]: function*() {
    for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }, 

    // Return a string representation of the range
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

// Here are example uses of this new Range class
let r = new Range(1,3); // Create a Range object; note the use of new
r.includes(2)           // => true: 2 is in the range
r.toString()            // => "(1...3)"
// [...r]               // => [1, 2, 3]; convert to an array via iterator



// 9.2.1 Constructors, Class Identity, and instanceof
/*
Even though constructors are not as fundamental as prototypes, the constructor
serves as the public face of a class. Most obviously, the name of the constructor function
is usually adopted as the name of the class. We say, for example, that the Range()
constructor creates Range objects. More fundamentally, however, constructors are
used as the righthand operand of the instanceof operator when testing objects for
membership in a class.
*/
r instanceof Range                      // => true: r inherits from Range.prototype


function Strange() {}
Strange.prototype = Range.prototype;
new Strange() instanceof Range          // => true


range.methods.isPrototypeOf(r);         // range.methods is the prototype object.



// 9.2.2 The constructor Property

let F = function() {};                  // This is a function object.
let p = F.prototype;                    // This is the prototype object associated with F.
let c = p.constructor;                  // This is the function associated with the prototype.
c === F                                 // => true: F.prototype.constructor === F for any F


let o = new F();                        // Create an object o of class F
o.constructor === F                     // => true: the constructor property specifies the class


Range.prototype = {
    constructor: Range,                 // Explicitly set the constructor back-reference
    /* method definitions go here */
};


// Extend the predefined Range.prototype object so we don't overwrite
// the automatically created Range.prototype.constructor property.
Range.prototype.includes = function(x) {
    return this.from <= x && x <= this.to;
};

Range.prototype.toString = function() {
    return "(" + this.from + "..." + this.to + ")";
};
