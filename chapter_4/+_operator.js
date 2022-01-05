"The + Operator"

/*
The binary + operator adds numeric operands or concatenates string operands:
*/

1 + 2                           // => 3
"hello" + " " + "there"         // => "hello there"
"1" + "2"                       // => "12"


/*
Technically, the + operator behaves like this:
    • If either of its operand values is an object, it converts it to a primitive using the
    object-to-primitive algorithm. Date objects are converted by
    their toString() method, and all other objects are converted via valueOf(), if
    that method returns a primitive value. However, most objects do not have a useful
    valueOf() method, so they are converted via toString() as well.
    
    • After object-to-primitive conversion, if either operand is a string, the other is
    converted to a string and concatenation is performed.
    
    • Otherwise, both operands are converted to numbers (or to NaN) and addition is
    performed.
*/

1 + 2                       // => 3: addition
"1" + "2"                   // => "12": concatenation
"1" + 2                     // => "12": concatenation after number-to-string
1 + {}                      // => "1[object Object]": concatenation after object-to-string
true + true                 // => 2: addition after boolean-to-number
2 + null                    // => 2: addition after null converts to 0
2 + undefined               // => NaN: addition after undefined converts to NaN


/*
Finally, it is important to note that when the + operator is used with strings and numbers,
it may not be associative.
*/
1 + 2 + " blind mice"           // => "3 blind mice"
1 + (2 + " blind mice")         // => "12 blind mice"
