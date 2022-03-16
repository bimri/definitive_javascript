// 9.3 Classes with the class Keyword

class Range {
    constructor(from, to) {
        this.from = from;
        this.to   = to;
    }

    includes(x) { return this.from <= x && x <= this.to; }

    *[Symbol.iterator]() {
        for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }

    toString()  { return `(${this.from}...${this.to})`}
}

// Here are example uses of this new Range class
let r = new Range(1,3);                 // Create a Range object
r.includes(2)                           // true: 2 is in the range
r.toString()                            // => "(1...3)"
// [...r]                              // => [1, 2, 3]; convert to an array via iterator


class Span extends Range {
    constructor(start, length) {
        if (length >= 0) {
            super(start, start + length);
        } else {
            super(start + length, start);
        }
    }
}


// class declarations have both statement and expression forms.
let square = function(x) { return x * x; };
square(3)                   // => 9

// We can also write:
let Square = class { constructor(x) { this.area = x * x; } };
new Square(3).area          // => 9



// 9.3.1 Static Methods
// static parse(s) {
//     let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
//     if (!matches) {
//         throw new TypeError(`Cannot parse Range from "${s}".`)
//     }
//     return new Range(parseInt(matches[1]), parseInt(matches[2]));
// }



// 9.3.2 Getters, Setters, and other Method Forms
// *[Symbol.iterator]() {
//     for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
// }



// 9.3.3 Public, Private, and Static Fields
class Buffer {
    constructor() {
    this.size = 0;
    this.capacity = 4096;
    this.buffer = new Uint8Array(this.capacity);
    }
}


// With the new instance field syntax that is likely to be standardized
class Buffer {
    size = 0;
    capacity = 4096;
    buffer = new Uint8Array(this.capacity);
}

// private #size field
class Buffer {
    #size = 0;
    get size() { return this.#size; }
}


// static integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;
// static parse(s) {
//     let matches = s.match(Range.integerRangePattern);
//     if (!matches) {
//         throw new TypeError(`Cannot parse Range from "${s}".`)
//     }
// return new Range(parseInt(matches[1]), matches[2]);
// }



// 9.3.4 Example: A Complex Number Class
