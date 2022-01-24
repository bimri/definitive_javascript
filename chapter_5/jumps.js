// 5.5 Jumps

/* 
these cause the JavaScript interpreter to jump to a new location in the source code.
The break statement makes the interpreter jump to the end of a loop or other statement.
continue makes the interpreter skip the rest of the body of a loop and jump
back to the top of a loop to begin a new iteration.

The return statement makes the interpreter jump from a function invocation back to
the code that invoked it and also supplies the value for the invocation. The throw
statement is a kind of interim return from a generator function. The throw statement
raises, or throws, an exception and is designed to work with the try/catch/finally
statement, which establishes a block of exception-handling code.
*/

// 5.5.1 Labeled Statements

/* 
    identifier: statement

By labeling a statement, you give it a name that you can use to refer to it elsewhere in
your program. You can label any statement, although it is only useful to label statements
that have bodies, such as loops and conditionals. By giving a loop a name, you
can use break and continue statements inside the body of the loop to exit the loop or
to jump directly to the top of the loop to begin the next iteration.
*/
mainloop: while(token !== null) {
    // Code omitted...
    continue mainloop;              // Jump to the next iteration of the named loop
    // More code omitted...
}

/*
The identifier you use to label a statement can be any legal JavaScript identifier that is
not a reserved word. The namespace for labels is different than the namespace for
variables and functions, so you can use the same identifier as a statement label and as
a variable or function name.
*/


// 5.5.2 break

/* 
The break statement, used alone, causes the innermost enclosing loop or switch
statement to exit immediately.
    break;
*/

for (let i = 0; i < a.length; i++) {
    if (a[i] === target) break;
}

/* 
JavaScript also allows the break keyword to be followed by a statement label (just the
identifier, with no colon):
    break labelname;
*/
let matrix = getData();                 // Get a 2D array of numbers from somewhere
// Now sum all the numbers in the matrix.
let sum = 0, success = false;
// Start with a labeled statement that we can break out of if errors occur
computeSum: if (matrix) {
    for (let x = 0; x < matrix.length; x++) {
        let row = matrix[x];
        if (!row) break computeSum;
        for (let y = 0; y < row.length; y++) {
            let cell = row[y];
            if (isNaN(cell)) break computeSum;
            sum += cell;
        }
    }
    success = true;
}
// The break statements jump here. If we arrive here with success == false
// then there was something wrong with the matrix we were given.
// Otherwise, sum contains the sum of all cells of the matrix.


// 5.5.3 continue

/* 
The continue statement is similar to the break statement. Instead of exiting a loop,
however, continue restarts a loop at the next iteration.
    continue;

The continue statement can also be used with a label:
    continue labelname;

When the continue statement is executed, the current iteration of the enclosing loop
is terminated, and the next iteration begins.
*/
for(let i = 0; i < data.length; i++) {
    if (!data[i]) continue;                     // Can't proceed with undefined data
    total += data[i];
}


// 5.5.4 return
/* 
Recall that function invocations are expressions and that all expressions have values.
    return expression;
*/
function square(x) { return x*x; }              // A function that has a return statement
square(2)               // => 4


function displayObject(o) {
    // Return immediately if the argument is null or undefined.
    if (!o) return;
    // Rest of function goes here...
}


// 5.5.5 yield
/* 
The yield statement is much like the return statement but is used only in ES6 generator
functions to produce the next value in the generated sequence of values
without actually returning:
*/
// A generator function that yields a range of integers
function* range(from, to) {
    for(let i = from; i <= to; i++) {
        yield i;
    }
}


// 5.5.6 throw

/*
An exception is a signal that indicates that some sort of exceptional condition or error
has occurred. To throw an exception is to signal such an error or exceptional condition.
To catch an exception is to handle it—to take whatever actions are necessary or
appropriate to recover from the exception.
    throw expression;
*/

function factorial(x) {
    // If the input argument is invalid, throw an exception!
    if (x < 0) throw new Error("x must not be negative");
    // Otherwise, compute a value and return normally
    let f;
    for(f = 1; x > 1; f *= x, x--) /* empty */ ;
    return f;
}
factorial(4) // => 24


// 5.5.7 try/catch/finally
/* 
The try/catch/finally statement is JavaScript’s exception handling mechanism.
The try clause of this statement simply defines the block of code whose exceptions
are to be handled. The try block is followed by a catch clause, which is a block of
statements that are invoked when an exception occurs anywhere within the try block.
The catch clause is followed by a finally block containing cleanup code that is guaranteed
to be executed, regardless of what happens in the try block. Both the catch
and finally blocks are optional, but a try block must be accompanied by at least one
of these blocks. The try, catch, and finally blocks all begin and end with curly
braces.
*/

try {
    // Normally, this code runs from the top of the block to the bottom
    // without problems. But it can sometimes throw an exception,
    // either directly, with a throw statement, or indirectly, by calling
    // a method that throws an exception.
    }
    catch(e) {
    // The statements in this block are executed if, and only if, the try
    // block throws an exception. These statements can use the local variable
    // e to refer to the Error object or other value that was thrown.
    // This block may handle the exception somehow, may ignore the
    // exception by doing nothing, or may rethrow the exception with throw.
}
finally {
// This block contains statements that are always executed, regardless of
// what happens in the try block. They are executed whether the try
// block terminates:
// 1) normally, after reaching the bottom of the block
// 2) because of a break, continue, or return statement
// 3) with an exception that is handled by a catch clause above
// 4) with an uncaught exception that is still propagating
}

try {
    // Ask the user to enter a number
    let n = Number(prompt("Please enter a positive integer", ""));
    // Compute the factorial of the number, assuming the input is valid
    let f = factorial(n);
    // Display the result
    alert(n + "! = " + f);
    }
    catch(ex) { // If the user's input was not valid, we end up here
    alert(ex); // Tell the user what the error is
}


// Like JSON.parse(), but return undefined instead of throwing an error
function parseJSON(s) {
    try {
    return JSON.parse(s);
    } catch {
    // Something went wrong but we don't care what it was
    return undefined;
    }
}
