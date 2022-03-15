// 8.6 Closures
/*
Like most modern programming languages, JavaScript uses lexical scoping. This
means that functions are executed using the variable scope that was in effect when
they were defined, not the variable scope that is in effect when they are invoked. In
order to implement lexical scoping, the internal state of a JavaScript function object
must include not only the code of the function but also a reference to the scope in
which the function definition appears. This combination of a function object and a
scope (a set of variable bindings) in which the function’s variables are resolved is
called a closure in the computer science literature.
*/

let scope = 'global scope';

function checkscope() {
  let scope = 'local scope';                    // A local variable
  function f()  {return scope; }                 // Return the value in scope here
  return f();
}
checkscope();                                    // 'local scope'

/*
Remember the fundamental rule of lexical scoping: JavaScript functions are executed
using the scope they were defined in.
*/
let uniqueInteger = (function() {               // Define and invoke
    let counter = 0;                            // Private state of function below
    return function() { return counter++; };
}());
uniqueInteger()             // => 0
uniqueInteger()             // => 1



function counter() {
    let n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
    };
}

let c = counter(), d = counter();               // Create two counters
c.count()                                       // => 0
d.count()                                       // => 0: they count independently
c.reset();                                      // reset() and count() methods share state
c.count()                                       // => 0: because we reset c
d.count()                                       // => 1: and d's count was unaffected


// combine this closure technique with property
// getters and setters
function counter1(n) {
    return {
        // Property getter method returns and increments private counter var.
        get count() { return n++;},
        // Property setter doesn't allow the value of n to decrease
        set count(m) {
            if (m > n) n = m;
            else throw Error('count cannot be set to a value less than current count');
        }
    };
}
let cv = counter(1000);
cv.count                    // => 1000
cv.count                    // => 1001
cv.count = 2000;
cv.count                    // => 2000
cv.count = 2000;            // !Error: count can only be set to a larger value



// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.
function addPrivateProperty(o, name, predicate) {
    let value;          // This is the property value

    // The getter method simply returns the value.
    o[`get${name}`] = function() { return value };

    // The setter method stores the value or throws an exceptioin if
    // the predicate rejects the value.
    o[`set${name}`] = function(v) {
        if (predicate && !predicate(v)) {
            throw new TypeError(`set${name}: invalid value ${v}`);
        } else {
            value = v;
        }
    };
}

// The following code demonstrates the addPrivateProperty() method.
let o = {}; // Here is an empty object

// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", x => typeof x === "string");

o.setName("Frank");                 // Set the property value
o.getName()                         // => "Frank"
o.setName(0);                       // !TypeError: try to set a value of the wrong type
