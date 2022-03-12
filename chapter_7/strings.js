// 7.10 Strings as Arrays

/*
JavaScript strings behave like read-only arrays of UTF-16 Unicode characters. Instead
of accessing individual characters with the charAt() method, you can use square
brackets:

The typeof operator still returns “string” for strings, of course, and the Array.isAr
ray() method returns false if you pass it a string.
*/

let s = "test";
s.charAt(0)                 // => "t"
s[1]                        // => "e"


/*
The primary benefit of indexable strings is simply that we can replace calls to
charAt() with square brackets, which are more concise and readable, and potentially
more efficient. The fact that strings behave like arrays also means, however, that we
can apply generic array methods to them.

Keep in mind that strings are immutable values, so when they are treated as arrays,
they are read-only arrays.
*/

Array.prototype.join.call("JavaScript", " ")    // => "J a v a S c r i p t"
