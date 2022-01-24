/*
a statement block combines multiple statements into a single compound
statement. A statement block is simply a sequence of statements enclosed within curly
braces.
*/

{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(n) = " + cx);
}

/*
There are a few things to note about this statement block. First, it does not end with a
semicolon. The primitive statements within the block end in semicolons, but the
block itself does not.
*/


// The empty statement looks like this:
;


/*
The JavaScript interpreter takes no action when it executes an empty statement. The
empty statement is occasionally useful when you want to create a loop that has an
empty body.

In this loop, all the work is done by the expression a[i++] = 0, and no loop body is
necessary. JavaScript syntax requires a statement as a loop body, however, so an empty
statement—just a bare semicolon—is used.
*/

// Initialize an array a
for(let i = 0; i < a.length; a[i++] = 0) ;


/* 
Note that the accidental inclusion of a semicolon after the right parenthesis of a for
loop, while loop, or if statement can cause frustrating bugs that are difficult to
detect.
*/
if ((a === 0) || (b === 0));        // this line does nothing
    o = null;                       // this line is always executed



/* 
When you intentionally use the empty statement, it is a good idea to comment your
code in a way that makes it clear that you are doing it on purpose.
*/
for (let i = 0; i < a.length; a[i++] = 0) /* empty */ ;

