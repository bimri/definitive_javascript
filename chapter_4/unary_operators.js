"Unary Arithmetic Operators"

/*
Unary operators modify the value of a single operand to produce a new value. In
JavaScript, the unary operators all have high precedence and are all right-associative

The arithmetic unary operators described in this section (+, -, ++, and --) all convert
their single operand to a number, if necessary

Note that the punctuation characters + and - are used as both unary and binary operators.

The unary arithmetic operators are the following:
    Unary plus (+)
        The unary plus operator converts its operand to a number (or to NaN) and
        returns that converted value. When used with an operand that is already a number,
        it doesn’t do anything. This operator may not be used with BigInt values,
        since they cannot be converted to regular numbers.
    
    Unary minus (-)
        When - is used as a unary operator, it converts its operand to a number, if necessary,
        and then changes the sign of the result.
    
    Increment (++)
        The ++ operator increments (i.e., adds 1 to) its single operand, which must be an
        lvalue (a variable, an element of an array, or a property of an object). The operator
        converts its operand to a number, adds 1 to that number, and assigns the
        incremented value back into the variable, element, or property.
    
    Decrement (--)
        The -- operator expects an lvalue operand. It converts the value of the operand
        to a number, subtracts 1, and assigns the decremented value back to the operand.
        Like the ++ operator, the return value of -- depends on its position relative to the
        operand. When used before the operand, it decrements and returns the decremented
        value. When used after the operand, it decrements the operand but
        returns the undecremented value. When used after its operand, no line break is
        allowed between the operand and the operator.
*/

let i = 1, j = ++i;             // i and j are both 2
let n = 1, m = n++;             // n is 2, m is 1
