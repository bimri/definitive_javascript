"Operator Precedence"

w = x + y*z;
w = (x + y)*z;

// property access and invocation expressions have higher precedence than any of the operators

// my is an object with a property named functions whose value is an
// array of functions. We invoke function number x, passing it argument
// y, and then we ask for the type of the value returned.
typeof my.functions[x](y)


/*
Although typeof is one of the highest-priority operators, the typeof operation is performed
on the result of the property access, array index, and function invocation, all
of which have higher priority than operators.
*/


// In practice, if you are at all unsure about the precedence of your operators, the simplest
// thing to do is to use parentheses to make the evaluation order explicit.
