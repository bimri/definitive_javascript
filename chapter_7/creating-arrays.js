// 7.1 Creating Arrays

/*
There are several ways to create arrays. The subsections that follow explain how to
create arrays with:
    • Array literals
    • The ... spread operator on an iterable object
    • The Array() constructor
    • The Array.of() and Array.from() factory methods
*/


// 7.1.1 Array Literals
let empty = [];                         // An array with no elements
let primes = [2, 3, 5, 7, 11];          // An array with 5 numeric elements
let misc = [ 1.1, true, "a", ];         // 3 elements of various types + trailing comma

/*
The values in an array literal need not be constants; they may be arbitrary
expressions:
*/
let base = 1024;
let table = [base, base+1, base+2, base+3];

// Array literals can contain object literals or other array literals:
let bx = [[1, {x: 1, y: 2}], [2, {x: 3, y: 4}]];

/*
If an array literal contains multiple commas in a row, with no value between, the
array is sparse. Array elements for which values are omitted do not exist
but appear to be undefined if you query them:

Array literal syntax allows an optional trailing comma, so [,,] has a length of 2,
not 3.
*/
let count = [1,,3];                         // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,];                          // An array with no elements but a length of 2


// 7.1.2 The Spread Operator
/*
In ES6 and later, you can use the “spread operator,” ..., to include the elements of
one array within an array literal:
*/
let ax = [1, 2, 3];
let b = [0, ...a, 4];                       // b == [0, 1, 2, 3, 4]


// spread operator is a convenient way to create a (shallow) copy of an array
let original = [1,2,3];
let copy = [...original];
copy[0] = 0;                                // Modifying the copy does not change the original
original[0]                                 // => 1

/*
Strings are iterable, so you can use a spread operator to turn any
string into an array of single-character strings
*/
let digits = [..."0123456789ABCDEF"];
digits                                      // => ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

/*
Set objects are iterable, so an easy way to remove duplicate elements from
an array is to convert the array to a set and then immediately convert the set back to
an array using the spread operator:
*/
let letters = [..."hello world"];
[...new Set(letters)]                       // => ["h","e","l","o"," ","w","r","d"]


// 7.1.3 The Array() Constructor
// • Call it with no arguments: equivalent to the array literal [].
let ay = new Array();

// Call it with a single numeric argument, which specifies a length: 
// creates an array with the specified length
let ak = new Array(10);

// • Explicitly specify two or more array elements or a single non-numeric element for the array:
// constructor arguments become the elements of the new array
let a = new Array(5, 4, 3, 2, 1, "testing, testing");


// 7.1.4 Array.of()

/* 
When the Array() constructor function is invoked with one numeric argument, it
uses that argument as an array length. But when invoked with more than one
numeric argument, it treats those arguments as elements for the array to be created.
This means that the Array() constructor cannot be used to create an array with a single
numeric element.

In ES6, the Array.of() function addresses this problem: it is a factory method that
creates and returns a new array, using its argument values (regardless of how many of
them there are) as the array elements:
*/
Array.of()                                  // => []; returns empty array with no arguments
Array.of(10)                                // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)                             // => [1, 2, 3]


// 7.1.5 Array.from()
// Array.from(iterable) works like the spread operator [...iterable] does.
let copy = Array.from(original);

/*
Array.from() is also important because it defines a way to make a true-array copy of
an array-like object. Array-like objects are non-array objects that have a numeric
length property and have values stored with properties whose names happen to be
integers. When working with client-side JavaScript, the return values of some web
browser methods are array-like, and it can be easier to work with them if you first
convert them to true arrays:
*/

let truearray = Array.from(arraylike);
