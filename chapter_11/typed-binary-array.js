// 11.2 Typed Arrays and Binary Data

// 11.2.2 Creating Typed Arrays
let bytes = new Uint8Array(1024);               // 1024 bytes
let matrix = new Float64Array(9);               // a 3x3 matrix
let point = new Int16Array(3);                  // A point in 3D space
let rgba = new Uint8ClampedArray(4);            // A 4-byte RGBA pixel value
let sudoku = new Int8Array(81);                 // A 9x9 sudoku board


/* 
When you create typed arrays in this way, the array elements are all guaranteed to be
initialized to 0, 0n, or 0.0. But if you know the values you want in your typed array,
you can also specify those values when you create the array. Each of the typed array
constructors has static from() and of() factory methods that work like
Array.from() and Array.of():
*/
let white = Uint8ClampedArray.of(255, 255, 255, 0);     // RGBA opaque white


// Note that both the constructor and the from() factory
// method allow you to copy existing typed arrays, while possibly changing the type:
let ints = Uint32Array.from(white);                     // The same 4 numbers, but as ints

/* When you create a new typed array from an existing array, iterable, or array-like
object, the values may be truncated in order to fit the type constraints of your array.
There are no warnings or errors when this happens: */ 

// Floats truncated to ints, longer int truncated to 8 bits
Uint8Array.of(1.23, 2.99, 45000)                        // new Uint8Array([1, 2, 200])

/* Finally, there is one more way to create typed arrays that involves the ArrayBuffer
type. An ArrayBuffer is an opaque reference to a chunk of memory. You can create
one with the constructor; just pass in the number of bytes of memory you’d like to
allocate: */
let buffer = new ArrayBuffer(1024*1024);
buffer.byteLength                                       // => 1024*1024; one megabyte of memory


// ArrayBuffer created earlier
let asbytes = new Uint8Array(buffer);                   // Viewed as bytes
let asints = new Int32Array(buffer);                    // Viewed as 32=bit signed ints
let lastK = new Uint8Array(buffer, 1024*1024);          // Last kilobyte as bytes
let int2 = new Int32Array(buffer, 1024, 256);           // 2nd kilobytes as 256 intergers

/* These four typed arrays offer four different views into the memory represented by the
ArrayBuffer. It is important to understand that all typed arrays have an underlying
ArrayBuffer, even if you do not explicitly specify one. If you call a typed array constructor
without passing a buffer object, a buffer of the appropriate size will be automatically
created. As described later, the buffer property of any typed array refers to
its underlying ArrayBuffer object. The reason to work directly with ArrayBuffer
objects is that sometimes you may want to have multiple typed array views of a single
buffer. */


// 11.2.3 Using Typed Arrays
/* Once you have created a typed array, you can read and write its elements with regular
square-bracket notation, just as you would with any other array-like object: */
// Return the largest prime smaller than n, using the sieve of Erastosthenes
function sieve(n) {
    let a = new Uint8Array(n+1);                        // a[x] will be 1 if x is composite
    let max = Math.floor(Math.sqrt(n));                 // Don't do factors higher than this
    let p = 2;                                          // 2 is the first prime
    while (p <= max) {
        for (let i = 2*p; i <= n; i += p)               // Mark multipes of p as composite
            a[i] = 1;
        while(a[++p])   /* empty */;                    // The next unmarked index is prime
    }
    while (a[n]) n--;                                   // Loop backward to find the last prime
    return n;
}

/* The function here computes the largest prime number smaller than the number you
specify. The code is exactly the same as it would be with a regular JavaScript array, but
using Uint8Array() instead of Array() makes the code run more than four times
faster and use eight times less memory in my testing. */

// Typed arrays are not true arrays, but they re-implement most array methods, so you
// can use them pretty much just like you’d use regular arrays:
let intss = new Int16Array(10);                     // 10 short integers
intss.fill(3).map(x=>x*x).join("")                  // "9999999999"

/* Remember that typed arrays have fixed lengths, so the length property is read-only,
and methods that change the length of the array (such as push(), pop(), unshift(),
shift(), and splice()) are not implemented for typed arrays. Methods that alter the
contents of an array without changing the length (such as sort(), reverse(), and
fill()) are implemented. Methods like map() and slice() that return new arrays
return a typed array of the same type as the one they are called on. */


// 11.2.4 Typed Array Methods and Properties
/* In addition to standard array methods, typed arrays also implement a few methods of
their own. The set() method sets multiple elements of a typed array at once by copying
the elements of a regular or typed array into a typed array: */
let bytess = new Uint8Array(1024);                  // A 1k buffer
let pattern = new Uint8Array([0,1,2,3]);            // An array of 4 bytes
bytess.set(pattern);                                // Copy them to the start of another byte array
bytess.set(pattern, 4);                             // Copy them again at a different offset
bytess.set([0,1,2,3], 8);                           // Or just copy values direct from a regular array
bytess.slice(0,12)                                  // => new Uint8Array([0,1,2,3,0,1,2,3,0,1,2,3])


/* The set() method takes an array or typed array as its first argument and an element
offset as its optional second argument, which defaults to 0 if left unspecified. If you
are copying values from one typed array to another, the operation will likely be
extremely fast.

Typed arrays also have a subarray method that returns a portion of the array on
which it is called: */
let intsss = new Int16Array([0,1,2,3,4,5,6,7,8,9]);             // 10 short integers
let last3 = intsss.subarray(intsss.length-3, intsss.length);    // Last 3 of them
last3[0]                                                        // => 7: this is the same as intsss[7]


/* subarray() takes the same arguments as the slice() method and seems to work the
same way. But there is an important difference. slice() returns the specified elements
in a new, independent typed array that does not share memory with the original
array. subarray() does not copy any memory; it just returns a new view of the
same underlying values: */
intsss[9] = -1;                                     // Change a value in the original array and...
last3[2]                                            // => -1: it also changes in the subarray


/* The fact that the subarray() method returns a new view of an existing array brings
us back to the topic of ArrayBuffers. Every typed array has three properties that relate
to the underlying buffer: */
last3.buffer                                        // The ArrayBuffer object for a typed array
last3.buffer === intsss.buffer                      // => true: both are views of the same buffer
last3.byteOffset                                    // => 14: this view starts at byte 14 of the buffer
last3.byteLength                                    // => 6: this view is 6 bytes (3 16-bit ints) long
last3.buffer.byteLength                             // => 20: but the underlying buffer has 20 bytes

/* The buffer property is the ArrayBuffer of the array. byteOffset is the starting position
of the array’s data within the underlying buffer. And byteLength is the length of
the array’s data in bytes. For any typed array, a, this invariant should always be true: */
a.length * a.BYTES_PER_ELEMENT === a.byteLength     // => true

/* ArrayBuffers are just opaque chunks of bytes. You can access those bytes with typed
arrays, but an ArrayBuffer is not itself a typed array. Be careful, however: you can use
numeric array indexing with ArrayBuffers just as you can with any JavaScript object.
Doing so does not give you access to the bytes in the buffer, but it can cause confusing
bugs: */
let bytesss = new Uint8Array(8);
bytesss[0] = 1;                                 // Set the first byte to 1
bytesss.buffer[0]                               // => undefined: buffer doesn't have index 0
bytesss.buffer[1] = 255;                        // Try incorrectly to set a byte in the buffer
bytesss.buffer[1]                               // => 255: this just sets a regular JS property
bytesss[1]                                      // => 0: the line above did not set the byte


// 11.2.5 DataView and Endianness
/* determine the endianness of the underlying platform */
// If the integer 0x00000001 is arranged in memory as 01 00 00 00, then
// we're on a little-endian platform. On a big-endian platform, we'd get
// bytes 00 00 00 01 instead.
let littleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;

// Assume we have a typed array of bytes of binary data to process. First,
// we create a DataView object so we can flexibly read and write
// values from those bytes
let view = new DataView(bytesss.buffer,
                        bytesss.byteOffset,
                        bytesss.byteLength);

let int = view.getUint32(0);                    // Read big-endian signed int from byte 0
int = view.getUint32(4, false);                 // Next int is also big-endian
int = view.getUint32(8, true);                  // Next int is little-endian and unsigned
view.setUint32(8, int, false);                  // Write it back in big-endian format

// DataView defines 10 get methods for each of the 10 typed array classes (excluding
// Uint8ClampedArray). They have names like getInt16(), getUint32(),
// getBigInt64(), and getFloat64(). The first argument is the byte offset within the
// ArrayBuffer at which the value begins.

/* Typed arrays and the DataView class give you all the tools you need to process binary
data and enable you to write JavaScript programs that do things like decompressing
ZIP files or extracting metadata from JPEG files. */
