"Pattern Matching"
// RegExps are not one of the fundamental
// datatypes in JavaScript, but they have a literal syntax like numbers and strings do, so
// they sometimes seem like they are fundamental.


// Text between a pair of slashes constitutes a regular expression literal. The second
// slash in the pair can also be followed by one or more letters, which modify the meaning
// of the pattern. For example:
//     /^HTML/;                            // Match the letters H T M L at the start of a string
//     /[1-9][0-9]*/;                      // Match a nonzero digit, followed by any # of digits
//     /\bjavascript\b/i;                  // Match "javascript" as a word, case-insensitive


// RegExp objects define a number of useful methods, and strings also have methods
// that accept RegExp arguments.
let text = "testing: 1, 2, 3";              // Sample text
let pattern = /\d+/g;                       // Matches all instances of one or more digits
pattern.test(text)                          // => true: a match exists
text.search(pattern)                        // => 9: position of first match
text.match(pattern)                         // => ["1", "2", "3"]: array of all matches
text.replace(pattern, "#")                  // => "testing: #, #, #"
text.split(/\D+/)                           // => ["","1","2","3"]: split on nondigits
