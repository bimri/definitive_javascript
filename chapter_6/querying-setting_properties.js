// 6.3 Querying and Setting Properties

// 6.3.1 Objects As Associative Arrays

/*
To obtain the value of a property, use the dot (.) or square bracket ([]) operators
*/

let author = book.author;                       // Get the "author" property of the book.
let name = author.surname;                      // Get the "surname" property of the author.
let title = book["main title"];                 // Get the "main title" property of the book.

// create or set a property
book.edition = 7;                               // Create the "edition" property of the book.
book["main title"] = "The Great Gatsby";        // Change the "main title" property of the book.


// 6.3.1 Objects As Associative Arrays

/* 
the following two JavaScript expressions have the same value:
    object.property
    object["property"]
*/

let addr = "";
for(let i = 0; i < 4; i++) {
    addr += customer[`address${i}`] + "\n";
}


function addstock(portfolio,stockname, shares) {
    portfolio[stockname] = portfolio[stockname] || 0;
    portfolio[stockname] += shares;
}


function computeValue(portfolio) {
    let total = 0.0;
    for(let stockname in portfolio) {                   // For each stock in the portfolio:
        let shares = portfolio[stockname];              // Get the number of shares.      
        let price =getQuote(stockname);                 // look up share price.
        total += shares * price;                        // add stock value to total value.
    }
    return total;
}


// 6.3.2 Inheritance

/* 
JavaScript objects have a set of “own properties,” and they also inherit a set of properties
from their prototype object.
*/

let o = {};                                         // o inherits object methods from Object.prototype
o.x = 1;                                            // and it now has an own property x.
let p = Object.create(o);                           // p inherits properties from o and Object.prototype
p.y = 2;                                            // and has an own property y.
let q = Object.create(p);                           // q inherits properties from p, o, and...
q.z = 3;                                            // ...Object.prototype and has an own property z.
let f = q.toString();                               // toString is inherited from Object.prototype
q.x + q.y                                           // => 3; x and y are inherited from o and p


let unitcircle = { r: 1 };                          // An object to inherit from
let c = Object.create(unitcircle);                  // c inherits the property r
c.x = 1; c.y = 1;                                   // c defines two properties of its own
c.r = 2;                                            // c overrides its inherited property
unitcircle.r                                        // => 1: the prototype is not affected


// 6.3.2 Inheritance

/* 
JavaScript objects have a set of “own properties,” and they also inherit a set of properties
from their prototype object.

every time you create an instance of a class with new, you are creating an object that inherits
properties from a prototype object.
*/

let o = {};                                         // o inherits object methods from Object.prototype
o.x = 1;                                            // and it now has an own property x.1
let p = Object.create(o);                           // p inherits properties from o and Object.prototype1
p.y = 2;                                            // and has an own property y.21
let q = Object.create(p);                           // q inherits properties from p, o, and...
q.z = 3;                                            // ...Object.prototype and has an own property z.31
let f = q.toString();                               // toString is inherited from Object.prototype
q.x + q.y                                           // => 3; x and y are inherited from o and p


/* 
Property assignment examines the prototype chain only to determine whether the
assignment is allowed.

If the assignment is allowed, however, it always creates or sets a property in
the original object and never modifies objects in the prototype chain. The fact that
inheritance occurs when querying properties but not when setting them is a key feature
of JavaScript because it allows us to selectively override inherited properties:

There is one exception to the rule that a property assignment either fails or creates or
sets a property in the original object. If o inherits the property x, and that property is
an accessor property with a setter method, then that setter method is
called rather than creating a new property x in o.
*/

let unitcircle = { r: 1 };                          // An object to inherit from
let c = Object.create(unitcircle);                  // c inherits the property r
c.x = 1; c.y = 1;                                   // c defines two properties of its own
c.r = 2;                                            // c overrides its inheritated property
unitcircle.r                                        // => 1: the prototype is not affected


// 6.3.3 Property Access Errors

/* 
Property access expressions do not always return or set a value.

It is not an error to query a property that does not exist.

It is an error, however, to attempt to query a property of an object 
that does not exist.

Property access expressions will fail if the lefthand side of the . is
or undefined . null

Attempting to set a property on null or undefined also causes a TypeError.
*/

book.subtitle                           // => undefined: property doesn't exist
let len = book.subtitle.length;         // !TypeError: undefined doesn't have length

// A verbose and explicit technique
let surname = undefined;
if (book) {
    if (book.author) {
        surname = book.author.surname;
    }
}

// A concise and idiomatic alternative to get surname or null or undefined
surname = book && book.author && book.author.surname;

// ES2020 supports conditional property access with ?.,
let surname = book?.author?.surname;

