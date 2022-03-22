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
