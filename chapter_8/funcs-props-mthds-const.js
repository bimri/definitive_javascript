// 8.7 Function Properties, Methods, and Constructor

// 8.7.1 The length Property
/*
The read-only length property of a function specifies the arity of the function—the
number of parameters it declares in its parameter list, which is usually the number of
arguments that the function expects. If a function has a rest parameter, that parameter
is not counted for the purposes of this length property.
*/



// 8.7.2 The name Property
/*
The read-only name property of a function specifies the name that was used when the
function was defined, if it was defined with a name, or the name of the variable or
property that an unnamed function expression was assigned to when it was first created.
This property is primarily useful when writing debugging or error messages.
*/



// 8.7.3 The prototype Property
/*
All functions, except arrow functions, have a prototype property that refers to an
object known as the prototype object. Every function has a different prototype object.
*/



// 8.7.4 The call() and apply() Methods
/*
call() and apply() allow you to indirectly invoke a function as if it were a
method of some other object.

    f.call(o);
    f.apply(o);

    o.m = f;            // Make f a temporary method of o.
    o.m();              // Invoke it, passing no arguments.
    delete o.m;         // Remove the temporary method.

Remember that arrow functions inherit the this value of the context where they are
defined. This cannot be overridden with the call() and apply() methods. If you call
either of those methods on an arrow function, the first argument is effectively
ignored.
*/

/*
If a function is defined to accept an arbitrary number of arguments, the apply()
method allows you to invoke that function on the contents of an array of arbitrary
length. In ES6 and later, we can just use the spread operator, but you may see ES5
code that uses apply() instead. For example, to find the largest number in an array of
numbers without using the spread operator, you could use the apply() method to
pass the elements of the array to the Math.max() function:

    let biggest = Math.max.apply(Math, arrayOfNumbers);
*/


// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
    let original = o[m];            // rem original method in the closure
    o[m] = function(...args) {      // now define the new method.
        console.log(new Date(), 'Entering:', m);            // Log message.
        let result = original.apply(this, args);            // Invoke original.
        console.log(new Date(), "Exiting:", m);             // Log message.
        return result;
    }
};



// 8.7.5 The bind() Method
/*
The primary purpose of bind() is to bind a function to an object. When you invoke
the bind() method on a function f and pass an object o, the method returns a new
function. Invoking the new function (as a function) invokes the original function f as
a method of o. Any arguments you pass to the new function are passed to the original
function.
*/
function f(y) { return this.x + y; }            // This function needs to be bound
let o = { x:1 };                                // An object we'll bind to
let g = f.bind(o);                              // Calling g(x) invokes f() on o
g(2)                                            // => 3
let p = { x: 10, g};                            // Invoke g() as a method of this object
p.g(2)                                          // => 3: g is still bound to o, not p.


/*
The bind() method does more than just bind a function to an object, however. It can
also perform partial application: any arguments you pass to bind() after the first are
bound along with the this value. This partial application feature of bind() does work
with arrow functions. Partial application is a common technique in functional programming
and is sometimes called currying.
*/
let sum = (x, y) => x + y;              // Return the sum of 2 args
let succ = sum.bind(null, 1);           // Bind the first argument to 1
succ(2)                                 // => 3: x is bound to 1, and we pass 2 for the y argument

function f(y,z) { return this.x + y + z; }
let gf = f.bind({x:1}, 2);              // Bind this and y
gf(3)                                   // =6: this.x is bound to 1, y is bound to 2 and z is 3



// 8.7.6 The toString() Method
/*
functions have a toString() method. The ECMAScript
spec requires this method to return a string that follows the syntax of the function
declaration statement. In practice, most (but not all) implementations of this
toString() method return the complete source code for the function.
*/



// 8.7.7 The Function() Constructor
const f = new Function("x", "y", "return x*y;");

/* This line of code creates a new function that is more or less equivalent to a function
defined with the familiar syntax: */
const f = function(x, y) { return x*y; };

/*
The Function() constructor expects any number of string arguments. The last argument
is the text of the function body; it can contain arbitrary JavaScript statements,
separated from each other by semicolons. All other arguments to the constructor are
strings that specify the parameter names for the function. If you are defining a
function that takes no arguments, you would simply pass a single string—the function
body—to the constructor.

    • The Function() constructor allows JavaScript functions to be dynamically created
    and compiled at runtime.

    • The Function() constructor parses the function body and creates a new function
    object each time it is called. If the call to the constructor appears within a loop or
    within a frequently called function, this process can be inefficient. By contrast,
    nested functions and function expressions that appear within loops are not
    recompiled each time they are encountered.

    • A last, very important point about the Function() constructor is that the functions
    it creates do not use lexical scoping; instead, they are always
*/
let scope = "global";
function constructFunction()    {
    let scope = "local";
    return new Function('return scope');            // Doesn't capture local scope!
}

// This line returns "global" because the function returned by the 
// Function() constructor does not use the local scope.
constructFunction()()                               // => "global"


/*
The Function() constructor is best thought of as a globally scoped version of eval()
that defines new variables and functions in its own private scope.
*/
