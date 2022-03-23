// 11.3 Pattern Matching with Regular Expressions

// 11.3.1 Defining Regular Expressions
let pattern = /s$/;

// equivalently been defined with the constructor RegExp()
let patt = new RegExp("s$");

// use the i flag with our regular expression to indicate that we want case-insensitive matching:
let patter = /s$/i;


/* 
Character classes

Individual literal characters can be combined into character classes by placing them
within square brackets. A character class matches any one character that is contained
within it. Thus, the regular expression /[abc]/ matches any one of the letters a, b, or
c. Negated character classes can also be defined; these match any character except
those contained within the brackets. A negated character class is specified by placing
a caret (^) as the first character inside the left bracket. The RegExp /[^abc]/ matches
any one character other than a, b, or c. Character classes can use a hyphen to indicate
a range of characters. To match any one lowercase character from the Latin alphabet,
use /[a-z]/, and to match any letter or digit from the Latin alphabet, use /[a-zAZ0-
9]/. (And if you want to include an actual hyphen in your character class, simply
make it the last character before the right bracket.)

Because certain character classes are commonly used, the JavaScript regularexpression
syntax includes special characters and escape sequences to represent these
common classes. For example, \s matches the space character, the tab character, and
any other Unicode whitespace character; \S matches any character that is not Unicode
whitespace. Table 11-2 lists these characters and summarizes character-class
syntax. (Note that several of these character-class escape sequences match only ASCII
characters and have not been extended to work with Unicode characters. You can,
however, explicitly define your own Unicode character classes; for example,
/[\u0400-\u04FF]/ matches any one Cyrillic character.)
*/

// Regular expression repetition characters
let r = /\d{2,4}/;          // Match between two and four digits
r = /\w{3}\d?/;             // Match exactly three word characters and optional digit
r = /\s+java\s+/;           // Match "java" with one or more spaces before or after
r = /[^(]*/;                // Match zero or more characters that are not open parens



// 11.3.2 String Methods for Pattern Matching
/* search() */
"JavaScript".search(/script/ui)             // => 4
"Python".search(/script/ui)                 // => -1

/* replace() */
// No matter how it is capitalized, replace it with the correct capitalization
text.replace(/javascript/gi, "JavaScript");

// A quote is a quotation mark, followed by any number of
// nonquotation mark characters (which we capture), followed
// by another quotation mark.
let quote = /"([^"])"/g;
// Replace the straight quotation marks with guillemets
// leaving the quoted text (stored in $1) unchanged.
'He said "stop"'.replace(quote, '«$1»')                 // => 'He said <<stop>>'

/* If your RegExp uses named capture groups, then you can refer to the matching text
by name rather than by number: */
let quoted = /"(?<quotedText>[^"])"/g;
'He said "stop"'.replace(quote, '«$<quotedText>»')      // => 'He said «stop»'

/* uses a replacement function to convert decimal integers in a string to hexadecimal:*/
let s = "15 times 15 is 225";
s.replace(/\d+/gu, n => parseInt(n).toString(16))       // "f times f is e1"

/* match() */
"7 plus 8 equals 15".match(/\d+/g)                      // => ["7", "8", "15"]

// A very simple URL parsing RegExp
let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text = "Visit my blog at http://www.example.com/~david";
let match = text.match(url);
let fullurl, protocol, host, path;
if (match !== null) {
    fullurl = match[0];                                 // fullurl == "http://www.example.com/~david"
    protocol = match[1];                                // protocol == "http"
    host = match[2];                                    // host == "www.example.com"
    path = match[3];                                    // path == "~david"
}

let url1 = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
let text1 = "Visit my blog at http://www.example.com/~david";
let match1 = text1.match(url1);
match1[0]                                               // => "http://www.example.com/~david"
match1.input                                            // => text
match1.index                                            // => 17
match1.groups.protocol                                  // => "http"
match1.groups.host                                      // => "www.example.com"
match1.groups.path                                      // => "~david"

/* If the y flag is set without g, then match() tries to find a single match, and, by default,
this match is constrained to the start of the string. */
let vowel = /[aeiou]/y;                 // Sticky vowel match
"test".match(vowel)                     // => null: "test" does not begin with a vowel
vowel.lastIndex = 1;                    // => Specify a different match position
"test".match(vowel)[0]                  // => "e": we founf a vowel at position 1
vowel.lastIndex                         // => 2: lastIndex was automatically updated
"test".match(vowel)                     // => null: no vowel at position 2
vowel.lastIndex                         // => 0: lastIndex gets reset after failed match

/* matchAll() */
// One or more Unicode alphabetic characters between word boundaries
const words = /\b\p{Alphabetic}+\b/gu;          // \p is not supported in firefox yet
const texts = "This is a naïve test of the matchAll() method.";
for (let word in texts.matchAll(words)) {
    console.log(`Found '${word[0]}' at index ${word.index}.`);
}

/* split() */
"123,456,789".split(",")                // => ["123", "456", "789"]

// method can also take a regular expression as its argument split()
"1, 2, 3,\n4, 5".split(/\s*,\s*/)       // => ["1", "2", "3", "4", "5"]

/* Surprisingly, if you call split() with a RegExp delimiter and the regular expression
includes capturing groups, then the text that matches the capturing groups will be
included in the returned array. */
const htmlTag = /<([^>]+)>/;            // < followed by one or more non->, followed by >
"Testing<br/>1,2,3".split(htmlTag)      // => ["Testing", "br/", "1,2,3"]
