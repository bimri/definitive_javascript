// 7.4 Array Length
/*
Every array has a length property, and it is this property that makes arrays different
from regular JavaScript objects.
*/
[].length                   // => 0: the array has no elements
["a","b","c"].length        // => 3: highest index is 2, length is 3


a = [1,2,3,4,5];            // Start with a 5-element array.
a.length = 3;               // a is now [1,2,3].
a.length = 0;               // Delete all elements. a is [].
a.length = 5;               // Length is 5, but no elements, like new Array(5)
