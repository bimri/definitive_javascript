// 5.6 Miscellaneous Statements

// 5.6.1 with

/* 
The with statement runs a block of code as if the properties of a specified object were
variables in scope for that code.
    with (object)
        statement
*/

document.forms[0].address.value

with(document.forms[0]) {
    // Access form elements directly here. For example:
    name.value = "";
    address.value = "";
    email.value = "";
}


/* 
This reduces the amount of typing you have to do: you no longer need to prefix each
form property name with document.forms[0]. It is just as simple, of course, to avoid
the with statement and write the preceding code like this:
*/
let f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";


// 5.6.2 debugger

/* 
available and is running, then an implementation may (but is not required to) perform
some kind of debugging action. In practice, this statement acts like a breakpoint:
execution of JavaScript code stops, and you can use the debugger to print
variables’ values, examine the call stack, and so on.

Note that it is not enough to have a debugger available: the debugger statement won’t
start the debugger for you. If you’re using a web browser and have the developer tools
console open, however, this statement will cause a breakpoint.
*/

function f(o) {
    if (o === undefined) debugger;          // Temporary line for debugging purposes
    // ...                                  // The rest of the function goes here.
}


// 5.6.3 “use strict”

/* 
"use strict" is a directive introduced in ES5. Directives are not statements (but are
close enough that "use strict" is documented here). There are two important differences
between the "use strict" directive and regular statements:
    • It does not include any language keywords: the directive is just an expression
    statement that consists of a special string literal (in single or double quotes).
    • It can appear only at the start of a script or at the start of a function body, before
    any real statements have appeared.

The purpose of a "use strict" directive is to indicate that the code that follows (in
the script or function) is strict code. The top-level (nonfunction) code of a script is
strict code if the script has a "use strict" directive. A function body is strict code if
it is defined within strict code or if it has a "use strict" directive. Code passed to
the eval() method is strict code if eval() is called from strict code or if the string of
code includes a "use strict" directive.
*/
