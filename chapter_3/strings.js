
let msg = "Hello, " + "world";                              // produces the string "Hello, world"
let greeting = "Welcome to my blog," + " " + nem;

// Strings can be compared with the standard === equality and !== inequality operators
/* 
    two strings are equal if and only if they consist of exactly the same sequence of 16-bit
    values. Strings can also be compared with the <, <=, >, and >= operators
    String comparison is done simply by comparing the 16-bit values.

    To determine the length of a string—the number of 16-bit values it contains—use the
    length property of the string:
        s.length
*/

// JavaScript provides a rich API for working with strings:
let s = "Hello, world";                                     // Start with some text.

// Obtaining portions of a string
s.substring(1,4)                                            // => "ell": the 2nd, 3rd, and 4th characters.
s.slice(1,4)                                                // => "ell": same thing
s.slice(-3)                                                 // => "rld": last 3 characters
s.split(", ")                                               // => ["Hello", "world"]: split at delimiter string

// Searching a string
s.indexOf("l")                                              // => 2: position of first letter l
s.indexOf("l", 3)                                           // => 3: position of first "l" at or after 3
s.indexOf("zz")                                             // => -1: s does not include the substring "zz"
s.lastIndexOf("l")                                          // => 10: position of last letter l 

// Searching a string
s.indexOf("l")                                              // => 2: position of first letter l
s.indexOf("l", 3)                                           // => 3: position of first "l" at or after 3
s.indexOf("zz")                                             // => -1: s does not include the substring "zz"
s.lastIndexOf("l")                                          // => 10: position of last letter l

// Creating modified versions of a string
s.replace("llo", "ya")                                      // => "Heya, world"
s.toLowerCase()                                             // => "hello, world"
s.toUpperCase()                                             // => "HELLO, WORLD"
s.normalize()                                               // Unicode NFC normalization: ES6
s.normalize("NFD")                                          // NFD normalization. Also "NFKC", "NFKD"

// Inspecting individual (16-bit) characters of a string
s.charAt(0)                                                 // => "H": the first character
s.charAt(s.length-1)                                        // => "d": the last character
s.charCodeAt(0)                                             // => 72: 16-bit number at the specified position
s.codePointAt(0)                                            // => 72: ES6, works for codepoints > 16 bits

// String padding functions in ES2017
"x".padStart(3)                                             // => " x": add spaces on the left to a length of 3
"x".padEnd                                                  // => "x ": add spaces on the right to a length of 3
"x".padStart(3, "*")                                        // => "**x": add stars on the left to a length of 3
"x".padEnd(3, "-")                                          // => "x--": add dashes on the right to a length of 3

// Space trimming functions. trim() is ES5; others ES2019
" test ".trim()                                             // => "test": remove spaces at start and end
" test ".trimStart()                                        // => "test ": remove spaces on left. Also trimLeft
" test ".trimEnd()                                          // => " test": remove spaces at right. Also trimRight

// Miscellaneous string methods
s.concat("!")                                               // => "Hello, world!": just use + operator instead
"<>".repeat(5)                                              // => "<><><><><>": concatenate n copies. ES6


/*
    Remember that strings are immutable in JavaScript. Methods like replace() and
    toUpperCase() return new strings: they do not modify the string on which they are
    invoked.
*/


// Strings can also be treated like read-only arrays, and you can access individual characters
// (16-bit values) from a string using square brackets instead of the charAt()
// method:
let s = "hello, world";
s[0] // => "h"
s[s.length-1] // => "d"
