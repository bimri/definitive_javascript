// 7.3 Sparse Arrays
/*
A sparse array is one in which the elements do not have contiguous indexes starting at
0. Normally, the length property of an array specifies the number of elements in the
array. If the array is sparse, the value of the length property is greater than the number
of elements. Sparse arrays can be created with the Array() constructor or simply
by assigning to an array index larger than the current array length.
*/
let a = new Array(5);           // No elements, but a.length is 5.
a = [];                         // Create an array with no elements and length = 0.
a[1000] = 0;                    // Assignment adds one element but sets length to 1001.


// Note that when you omit a value in an array literal
let a1 = [,];                   // This array has no elements and length 1
let a2 = [undefined];           // This array has one undefined element
0 in a1                         // => false: a1 has no element with index 0
0 in a2                         // => true: a2 has the undefined value at index 0
