// 5.4 Loops

/* 
The looping statements are those that
bend that path back upon itself to repeat portions of your code. JavaScript has five
looping statements: while, do/while, for, for/of (and its for/await variant), and
for/in.
*/


// 5.4.1 while

/*
while statement in JS's basic loop

    while (expression)
        statement;

To execute a while statement, the interpreter first evaluates expression. If the value of
the expression is falsy, then the interpreter skips over the statement that serves as the
loop body and moves on to the next statement in the program. If, on the other hand,
the expression is truthy, the interpreter executes the statement and repeats, jumping
back to the top of the loop and evaluating expression again. Another way to say this is
that the interpreter executes statement repeatedly while the expression is truthy. Note
that you can create an infinite loop with the syntax while(true).
*/
let count = 0;
while(count < 10) {
    console.log(count);
    count++;
}


// 5.4.2 do/while

/* 
The do/while loop is like a while loop, except that the loop expression is tested at the
bottom of the loop rather than at the top. This means that the body of the loop is
always executed at least once.

    do 
        statement
    while (expression);

There are a couple of syntactic differences between the do/while loop and the ordinary
while loop. First, the do loop requires both the do keyword (to mark the beginning
of the loop) and the while keyword (to mark the end and introduce the loop
condition). Also, the do loop must always be terminated with a semicolon. The while
loop doesn’t need a semicolon if the loop body is enclosed in curly braces.
*/

function printArray(a) {
    let len = a.length, i = 0;
    if (len === 0) {
        console.log("Empty Array");
    } else {
        do {
            console.log(a[i]);
        } while(++i < len);
    }
}


// 5.4.3 for

/* 
The for statement simplifies loops that follow a common pattern.
Most loops have a counter variable of some kind. This variable is initialized
before the loop starts and is tested before each iteration of the loop. Finally, the
counter variable is incremented or otherwise updated at the end of the loop body, just
before the variable is tested again. In this kind of loop, the initialization, the test, and
the update are the three crucial manipulations of a loop variable.

    for(initialize ; test ; increment)
        statement

The simplest way to explain how a for loop works is to show the equivalent while
loop:
    initialize;
    while(test) {
        statement
        increment;
    }

In other words, the initialize expression is evaluated once, before the loop begins. To
be useful, this expression must have side effects (usually an assignment). JavaScript
also allows initialize to be a variable declaration statement so that you can declare and
initialize a loop counter at the same time. The test expression is evaluated before each
iteration and controls whether the body of the loop is executed. If test evaluates to a
truthy value, the statement that is the body of the loop is executed. Finally, the increment
expression is evaluated. Again, this must be an expression with side effects in
order to be useful. Generally, it is either an assignment expression, or it uses the ++
or -- operators.
*/
for (let count = 0; count < 10; count++) {
    console.log(count);
}


let i, j, sum = 0;
for(i = 0, j=1; i < 10; i++, j--) {
    sum += i * j;
}


function tail(o) {                                  // Return the tail of linked list o
    for(; o.next; o=o.next) /* empty */ ;           // Traverse while o.next is truthy
    return o;
}

/* 
Note that this code has no initialize expression. Any of the three expressions may be
omitted from a for loop, but the two semicolons are required. If you omit the test
expression, the loop repeats forever, and for(;;) is another way of writing an infinite
loop, like while(true).
*/


// 5.4.4 for/of

/* 
The for/of loop works with iterable objects.
arrays, strings, sets, and maps are iterable: they represent a sequence or set of elements
that you can loop or iterate through using a for/of loop.

Arrays are iterated “live”—changes made during the iteration may affect the outcome
of the iteration. If we modify the preceding code by adding the line data.push(sum);
inside the loop body, then we create an infinite loop because the iteration can never
reach the last element of the array.
*/
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum = 0;
for (let element of data) {
    sum += element;
}
sum                     // => 45


// for/of with objects
/* Objects are not (by default) iterable. */
let o = { x: 1, y: 2, z: 3};
for (let element of o) {                        // Throws TypeError because o is not iterable
    console.log(element);
}


/* 
If you want to iterate through the properties of an object, you can use the for/in loop
or use for/of with the Object.keys() method:
*/
let o = { x: 1, y: 2, z: 3 };
let keys = "";
for (let k of Object.keys(o)) {
    keys += k;
}
keys                // => "xyz"


let sum =  0;
for (let v of Object.values(o)) {
    sum += v;
}
sum                 // => 6


/*
And if you are interested in both the keys and the values of an object’s properties, you
can use for/of with Object.entries() and destructuring assignment:
*/
let pairs = "";
for (let [k, v] of Object.entries(o)) {
    pairs += k + v;
}
pairs               // => "x1y2z3"


// for/of with strings
let frequency = {};
for (let letter of "mississipi") {
    if (frequency[letter]) {
        frequency[letter]++;
    } else {
        frequency[letter] = 1;
    }
}
frequency           // => {m: 1, i: 4, s: 4, p: 2}


// for/of with Set and Map
let text = "Na na na na na na na na Batman!";
let wordSet = new Set(text.split(" "));
let unique = [];
for (let word of wordSet) {
    unique.push(word);
}
unique              // => ["Na", "na", "Batman!"]


let m = new Map([[1, "one"]]);
for (let [key, value] of m) {
    key         // => 1
    value       // => "one"
}


// Asynchronous iteration with for/await
async function printStream(stream) {
    for await (let chunk of stream) {
        console.log(chunk);
    }
}


// 5.4.5 for/in

/* 
The for/in statement loops through the property names of a specified object. The
syntax looks like this:
    for (variable in object)
        statement
*/
for (let p in o) {                      // Assign property names of o to variable p
    console.log(o[p]);                  // Print the value of each property
}


let o = { x: 1, y: 2, z: 3 };
let a = [], i = 0;
for (a[i++] in o);                       /* empty */

for (let i in a) console.log(i);


/* 
All objects have a toString() method
All properties and methods defined by your code are enumerable, by default.
Enumerable inherited properties are also enumerated by the for/in loop.
*/
