// 5.3 Conditionals
/*
Conditional statements execute or skip other statements depending on the value of a
specified expression. These statements are the decision points of your code, and they
are also sometimes known as “branches.”
*/

// 5.3.1 if statement
/*
if (expression)
    statement;
*/

if (username == null)                   // If username is null or undefined
    username = "anonymous";             // set username to anonymous

// If username is null, undefined, false, 0, "", or NaN, give it a new value
if (!username) username = "anonymous";


/*
JavaScript syntax requires a single statement after the if keyword and parenthesized
expression, but you can use a statement block to combine multiple statements into
one.
*/
if (!address) {
    address = "";
    message = "Please specify your address.";
}


/*
The second form of the if statement introduces an else clause that is executed when
expression is false.

    if (expression)
        statement1;
    else
        statement2;
*/
if (username == null) {
    username = "anonymous";
    message = "Please specify your username.";
} else {
    message = "Welcome, " + username + "!";
}




// 5.3.2 else if statement
if (n === 1) {
    // Execute code block #1
} else if (n === 2) {
    // Execute code block #2
} else if (n === 3) {
    // Execute code block #3
} else {
    // If all else fails, execute block #4
}

// syntactically equivalent, fully nested form
if (n === 1) {
    // Execute code block #1
}
else {
    if (n === 2) {
        // Execute this block #2
    }
    else {
        if (n === 3) {
            // Execute this block #3
        }
        else {
            // If all else fails, execute this block #4
        }
    }
}


// 5.3.3 switch statement
/*
An if statement causes a branch in the flow of a program’s execution, and you can
use the else if idiom to perform a multiway branch. This is not the best solution,
however, when all of the branches depend on the value of the same expression. In this
case, it is wasteful to repeatedly evaluate that expression in multiple if statements.
The switch statement handles exactly this situation. The switch keyword is followed
by an expression in parentheses and a block of code in curly braces:

    switch(expression) {
        statements;
    }
*/
switch(n) {
case 1:                                     // start here if n === 1
    // Execute code block #1
    break;                                  // stop here             
case 2:                                     // start here if n === 2
    // Execute code block #2
    break;                                  // stop here
case 3:                                     // start here if n === 3
    // Execute code block #3
    break;                                  // stop here
default:                                    // start here if none of the above
    // If all else fails, execute block #4
    break;                                  // stop here
}


function convert(x) {
    switch(typeof x) {
        case "number":                      // convert the number to a hexadecimal integer
            return x.toString(16);
        case "string":                      // convert the string to a decimal integer
            return '"' + x + '"';
        default:                            // otherwise, return the string "undefined"
            return String(x);
    }
}


/*
The switch statement first evaluates the expression that follows the switch keyword
and then evaluates the case expressions, in the order in which they appear, until it
finds a value that matches.1 The matching case is determined using the === identity
operator, not the == equality operator, so the expressions must match without any
type conversion.
*/
