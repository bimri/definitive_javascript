/*
The simplest kinds of statements in JavaScript are 
expressions that have side effects.
*/

nm = "bimri";
greetings = "Hello " + nm;
l = greetings.length;
l *= 3;

console.log(greetings, l);


/*
The increment and decrement operators, ++ and --, are related to assignment statements.
These have the side effect of changing a variable value, just as if an assignment
had been performed:
    counter++;

The delete operator has the important side effect of deleting an object property.
Thus, it is almost always used as a statement, rather than as part of a larger
expression:
    delete o.x;

Function calls are another major category of expression statements. For example:
    console.log(debugMessage);
    displaySpinner(); // A hypothetical function to display a spinner in a web app.
*/


Math.cos(Math.PI);              // want to discard result

cx = Math.cos(Math.PI);         // want to keep result


// Note that each line of code in each of these examples is terminated with a semicolon.
