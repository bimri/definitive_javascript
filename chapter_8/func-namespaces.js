// 8.5 Functions as Namespaces

function chunkNamespace() {
    // Chunk of code goes here
    // Any variables defined in the chunk are local to this function
    // instead of cluttering up the global namespace.
}
chunkNamespace();                                           // But don't forget to invoke the function!


/*
The open parenthesis before function is required because without it, the
JavaScript interpreter tries to parse the function keyword as a function declaration
statement. With the parenthesis, the interpreter correctly recognizes this as a function
definition expression.
*/
(function() {                                               // chunkNamespace() function rewritten as an unnamed expression.
    // Chunk of code goes here
}());                                                       // End the function literal and invoke it now.


/*
This use of functions as namespaces becomes really useful when we define one or
more functions inside the namespace function using variables within that namesapce,
but then pass them back out as the return value of the namespace function.
*/
