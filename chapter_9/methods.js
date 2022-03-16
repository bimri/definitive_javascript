// 9.4 Adding Methods to Existing Classes

// Return a complex number that is the complex conjugate of this one.
// Complex.prototype.conj = function() { return new Complex(this.r, -this.i); };

// Invoke the function f this many times, passing the iteration number
// For example, to print "hello" 3 times:
// let n = 3;
// n.times(i => { console.log(`hello ${i}`); });
Number.prototype.times = function(f, context) {
    let n = this.valueOf();
    for(let i = 0; i < n; i++) f.call(context, i);
};
