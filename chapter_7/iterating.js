// 7.6 Iterating Arrays

let letters = [..."Hello world"];           // An array of letters
let string = "";

// built-in array iterator
for(let letter of letters) {
string += letter;
}
string                                      // => "Hello world"; we reassembled the original text


/*
If you want to use a for/of loop for an array and need to know the index of each
array element, use the entries() method of the array, along with destructuring
assignment
*/
let everyother = "";
for (let [index, letter] of letters.entries()) {
    if (index % 2 === 0) everyother += letter;          // letters at even indexes
}
everyother                                  // "Hlowrd"


// Another good way to iterate arrays is with forEach().
/*
the forEach() is aware of sparse arrays and does not invoke
your function for elements that are not there.
*/
let uppercase = "";
letters.forEach(letter => {                 // Note arrow function syntax here
    uppercase += letter.toUpperCase();
});
uppercase                                   // => "HELLO WORLD"


/*
These examples assume that the array is dense and that all elements contain valid
data. If this is not the case, you should test the array elements before using them. If
you want to skip undefined and nonexistent elements, you might write:
*/
for(let i = 0; i < a.length; i++) {
    if (a[i] === undefined) continue;       // Skip undefined + nonexistent elements
    // loop body here
}
