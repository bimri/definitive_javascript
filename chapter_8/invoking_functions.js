// 8.2 Invoking Functions

// 8.2.1 Function Invocation
printprops({x: 1});
let total = distance(0,0,2,1) + distance(2,1,3,5);
let probability = factorial(5)/factorial(13);



// 8.2.2 Method Invocation
o.m = f;

// Having defined the method m() of the object o, invoke it like this:
o.m();

// Having defined the method m() of the object o, invoke it like this:
o.m(x, y);


let calculator = {      // An object literal
    operand1: 1,
    operand2: 1,
    add() {             // We're using method shorthand syntax for this function
        // Note the use of the this keyword to refer to the containing object.
        this.result = this.operand1 + this.operand2;
    }
};


// Method invocations may also involve more complex property access expressions:
customer.surname.toUpperCase();         // Invoke method on customer.surname
f().m();                                // Invoke method m() on the return of f()       



// 8.2.3 Constructor Invocation
o = new Object();
o = new Object;
