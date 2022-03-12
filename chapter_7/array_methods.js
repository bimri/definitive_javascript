// 7.8 Array Methods
// 7.8.1 Array Iterator Methods


// forEach()
let data = [1,2,3,4,5], sum = 0;
// Compute the sum of the elements of the array
data.forEach(value => { sum += value; });                   // sum == 15

// Now increment each array element
data.forEach(function(v, i, a) { a[i] = v + 1; });          // data == [2,3,4,5,6]



// map()
let cva = [1, 2, 3];
cva.map(x => x*x)                                             // => [1, 4, 9]: the function takes input x and returns x*x



// filter()
let z = [5, 4, 3, 2, 1];
z.filter(x => x < 3)                                        // => [2, 1]; values less than 3
z.filter((x,i) => i%2 === 0)                                // => [5, 3, 1]; every other value

/*
Note that filter() skips missing elements in sparse arrays and that its return value is
always dense. To close the gaps in a sparse array, you can do this:

    let dense = sparse.filter(() => true);

And to close gaps and remove undefined and null elements, you can use filter, like
this:

    a = a.filter(x => x !== undefined && x !== null);
*/



// find() and findIndex()
/*
The find() and findIndex() methods are like filter() in that they iterate through
your array looking for elements for which your predicate function returns a truthy
value. Unlike filter(), however, these two methods stop iterating the first time the
predicate finds an element. When that happens, find() returns the matching element,
and findIndex() returns the index of the matching element. If no matching
element is found, find() returns undefined and findIndex() returns -1:
*/
let ac = [1,2,3,4,5];
ac.findIndex(x => x === 3)                       // => 2; the value 3 appears at index 2
ac.findIndex(x => x < 0)                         // => -1; no negative numbers in the array
ac.find(x => x % 5 === 0)                        // => 5: this is a multiple of 5
ac.find(x => x % 7 === 0)                        // => undefined: no multiples of 7 in the array



// every() and some()
/*
The every() method is like the mathematical “for all” quantifier ∀: it returns true if
and only if your predicate function returns true for all elements in the array:
*/
let av = [1,2,3,4,5];
av.every(x => x < 10)                            // => true: all values are < 10.
av.every(x => x % 2 === 0)                       // => false: not all values are even.

/*
The some() method is like the mathematical “there exists” quantifier ∃: it returns
true if there exists at least one element in the array for which the predicate returns
true and returns false if and only if the predicate returns false for all elements of
the array:
*/
let af = [1,2,3,4,5];
af.some(x => x%2===0)                            // => true; a has some even numbers.
af.some(isNaN)                                   // => false; a has no non-numbers.



// reduce() and reduceRight()
let a = [1,2,3,4,5];
a.reduce((x,y) => x+y, 0)                       // => 15; the sum of the values
a.reduce((x,y) => x*y, 1)                       // => 120; the product of the values
a.reduce((x,y) => (x > y) ? x : y)              // => 5; the largest of the values

/*
reduceRight() works just like reduce(), except that it processes the array from highest
index to lowest (right-to-left), rather than from lowest to highest.
*/
// Compute 2^(3^4). Exponentiation has right-to-left precedence
let v = [2, 3, 4];
v.reduceRight((acc,val) => Math.pow(val,acc))   // => 2.4178516392292583e+24


// 7.8.2 Flattening arrays with flat() and flatMap()
/*
In ES2019, the flat() method creates and returns a new array that contains the same
elements as the array it is called on, except that any elements that are themselves
arrays are “flattened” into the returned array.

When called with no arguments, flat() flattens one level of nesting.
Elements of the original array that are themselves arrays are flattened, but array elements of those
arrays are not flattened.
*/
[1, [2, 3]].flat()              // => [1,2,3]
[1, [2, [3]]].flat()            // => [1,2,[3]]

// If you want to flatten more levels, pass a number to flat():
let xx = [1, [2, [3, [4]]]];
xx.flat(1)                      // => [1, 2, [3, [4]]]
xx.flat(2)                      // => [1, 2, 3, [4]]
xx.flat(3)                      // => [1, 2, 3, 4]
xx.flat(4)                      // => [1, 2, 3, 4]


// method works just like the method flatMap() map()
// except that the returned array is automatically flattened as if passed to flat().
let phrases = ["hello world", "goodbye world"];
let words = phrases.flatMap(phrase => phrase.split(" "));
words // => ["hello", "world", "goodbye", "world"]

// Map non-negative numbers to their square roots
[-2, -1, 1, 2].flatMap(x => x < 0 ? [] : Math.sqrt(x))      // => [1, 2**0.5]



// 7.8.3 Adding arrays with concat()
/*
The concat() method creates and returns a new array that contains the elements of
the original array on which concat() was invoked, followed by each of the arguments
to concat().
*/
let b = [1,2,3];
b.concat(4, 5)                      // => [1,2,3,4,5]
b.concat([4,5])                     // => [1,2,3,4,5]
b.concat([4,5], 6, [7,8])           // => [1,2,3,4,5,6,7,8]; arrays are flattened
b.concat([4,5], [6,[7], [8]])       // => [1,2,3,4,5,6,7,8]; but not nested arrays
b                                   // => [1,2,3]; the original array is not modified



// 7.8.4 Stacks and Queues with push(), pop(), shift(), and unshift()
/*
The combination of push() and pop() allows you
to use a JavaScript array to implement a first-in, last-out stack.
*/
let stack = [];                         // stack == []
stack.push(1,2);                        // stack == [1,2]
stack.pop()                             // stack == [1]; returns 2
stack.push(3);                          // stack == [1,3]
stack.pop()                             // stack == [1]; returns 3
stack.push([4,5]);                      // stack == [1,[4,5]]
stack.pop()                             // stack == [1]; returns [4,5]
stack.pop()                             // stack == []; returns 1


/*
The unshift() and shift() methods behave much like push() and pop(), except
that they insert and remove elements from the beginning of an array rather than from
the end. unshift() adds an element or elements to the beginning of the array, shifts
the existing array elements up to higher indexes to make room, and returns the new
length of the array. shift() removes and returns the first element of the array, shifting
all subsequent elements down one place to occupy the newly vacant space at the
start of the array.
*/
let queue = [];                             // queue == []
queue.push(1,2);                            // queue == [1,2]
queue.shift()                               // queue == [2]; returns 1
queue.push(3);                              // queue == [2,3]
queue.shift()                               // queue == [3]; returns 2
queue.shift()                               // queue == []; returns 3


/*
There is one feature of unshift() that is worth calling out because you may find it
surprising. When passing multiple arguments to unshift(), they are inserted all at
once, which means that they end up in the array in a different order than they would
be if you inserted them one at a time:
*/
let h = [1,2,3];                    // h == [1,2,3]
h.unshift(4,5);                     // h == [4,5,1,2,3]
h.unshift(6,7);                     // h == [6,7,4,5,1,2,3]
h = [];                             // h == []
h.unshift(1,2,3);                   // h == [3,2,1]



// 7.8.5 Subarrays with slice(), splice(), fill(), and copyWithin()
// slice()
let ao = [1,2,3,4,5];
ao.slice(0,3);                  // Returns [1,2,3]
ao.slice(3);                    // Returns [4,5]
ao.slice(1,-1);                 // Returns [2,3,4]
ao.slice(-3,-2);                // Returns [3]

// splice()
/*
splice() can delete elements from an array, insert new elements into an array, or
perform both operations at the same time.

The second argument to splice() is a length.) If this second argument is omitted, all array elements from the
start element to the end of the array are removed. splice() returns an array of the
deleted elements, or an empty array if no elements were deleted.
*/
let ab = [1,2,3,4,5,6,7,8];
ab.splice(4)                    // => [5,6,7,8]; a is now [1,2,3,4]
ab.splice(1,2)                  // => [2,3]; a is now [1,4]
ab.splice(1,1)                  // => [4]; a is now [1]

// The first two arguments to splice() specify which array elements are to be deleted.
// splice() inserts arrays themselves
let an = [1,2,3,4,5];
an.splice(2,0,"a","b")          // => []; a is now [1,2,"a","b",3,4,5]
an.splice(2,2,[1,2],3)          // => ["a","b"]; a is now [1,2,[1,2],3,3,4,5]



// fill()
let ak = new Array(5);           // Start with no elements and length 5
ak.fill(0)                       // => [0,0,0,0,0]; fill the array with zeros
ak.fill(9, 1)                    // => [0,9,9,9,9]; fill with 9 starting at index 1
ak.fill(8, 2, -1)                // => [0,9,8,8,9]; fill with 8 at indexes 2, 3


// copyWithin()
// copyWithin() copies a slice of an array to a new position within the array
let am = [1,2,3,4,5];
am.copyWithin(1)                 // => [1,1,2,3,4]: copy array elements up one
am.copyWithin(2, 3, 5)           // => [1,1,3,4,4]: copy last 2 elements to index 2
am.copyWithin(0, -2)             // => [4,4,3,4,4]: negative offsets work, too



// 7.8.6 Array Searching and Sorting Methods

// indexOf() and lastIndexOf()
/*
indexOf() and lastIndexOf() search an array for an element with a specified value
and return the index of the first such element found, or -1 if none is found.
indexOf() searches the array from beginning to end, and lastIndexOf() searches
from end to beginning:
*/
let al = [0,1,2,1,0];
al.indexOf(1)                   // => 1: a[1] is 1
al.lastIndexOf(1)               // => 3: a[3] is 1
al.indexOf(3)                   // => -1: no element has value 3


// Find all occurrences of a value x in an array a and return an array
// of matching indexes
function findAll(a, x) {
    let results = [],
        len = a.length,
        pos = 0;
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;
        results.push(pos);
        pos++;
    }
    return results;
}


// includes()
/*
The ES2016 includes() method takes a single argument and returns true if the array
contains that value or false otherwise. It does not tell you the index of the value,
only whether it exists. The includes() method is effectively a set membership test
for arrays.
*/
let aj = [1,2,3,4,5];
aj.includes(3)                  // => true: a contains 3
aj.includes(6)                  // => false: a does not contain 6
aj.includes(3, 3)               // => false: a does not contain 3 at index 3
aj.includes(3, -1)              // => true: a contains 3 at index 3
aj.includes(3, -2)              // => false: a does not contain 3 at index 2
aj.includes(3, -3)              // => true: a contains 3 at index 0


let at = [1,true,3,NaN];
at.includes(true)               // => true
at.includes(2)                  // => false
at.includes(NaN)                // => true
at.indexOf(NaN)                 // => -1; indexOf can't find NaN


// sort()
/*
sort() sorts the elements of an array in place and returns the sorted array. When
sort() is called with no arguments, it sorts the array elements in alphabetical order
(temporarily converting them to strings to perform the comparison, if necessary):
*/
let ag = ["banana", "cherry", "apple"];
ag.sort();                      // a == ["apple", "banana", "cherry"]

let abn = [33, 4, 1111, 222];
abn.sort();                     // a == [1111, 222, 33, 4]; alphabetical order
abn.sort(function(a,b) {        // Pass a comparator function
    return a-b;                 // Returns < 0, 0, or > 0, depending on order
});                             // a == [4, 33, 222, 1111]; numerical order
abn.sort((a,b) => b-a);         // a == [1111, 222, 33, 4]; reverse numerical order


let aw = ["ant", "Bug", "cat", "Dog"];
aw.sort();                      // a == ["Bug","Dog","ant","cat"]; case-sensitive sort
aw.sort(function(s,t) {
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
return 0;
});                             // a == ["ant","Bug","cat","Dog"]; case-insensitive sort


// reverse()
let va = [1,2,3];
va.reverse();                   // a == [3,2,1]



// 7.8.7 Array to String Conversions
/*
join() method converts all the elements of an array to strings and concatenates
them, returning the resulting string.
*/
let akk = [1, 2, 3];
akk.join()                      // => "1,2,3"
akk.join(" ")                   // => "1 2 3"
akk.join("")                    // => "123"
let bg = new Array(10);         // An array of length 10 with no elements
bg.join("-")                    // => "---------": a string of 9 hyphens


[1,2,3].toString()              // => "1,2,3"
["a", "b", "c"].toString()      // => "a,b,c"
[1, [2,"c"]].toString()         // => "1,2,c"



// 7.8.8 Static Array Functions
Array.isArray([]) // => true
Array.isArray({}) // => false
