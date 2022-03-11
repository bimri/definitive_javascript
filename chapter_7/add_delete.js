// 7.5 Adding and Deleting Array Elements

let a = [];                 // Start with an empty array.
a[0] = "zero";              // And add elements to it.
a[1] = "one";


// You can also use the push() method to add one or more values to the end of an array:
let a = [];                 // Start with an empty array
a.push("zero");             // Add a value at the end. a = ["zero"]
a.push("one", "two");       // Add two more values. a = ["zero", "one", "two"]


let a = [1,2,3];
delete a[2];                // a now has no element at index 2
2 in a                      // => false: no array index 2 is defined
a.length                    // => 3: delete does not affect array length


/*
Deleting an array element is similar to (but subtly different than) assigning unde
fined to that element. Note that using delete on an array element does not alter the
length property and does not shift elements with higher indexes down to fill in
the gap that is left by the deleted property. If you delete an element from an array, the
array becomes sparse.
*/
