// 11.6 JSON Serialization and Parsing

let o = {s: "", n: 0, a: [true, false, null]};
let s = JSON.stringify(0);                          // s == '{"s":"","n":0,"a":[true,false,null]}'
let copy = JSON.parse(s);                           // copy == {s: "", n: 0, a: [true, false, null]}

/* If we leave out the part where serialized data is saved to a file or sent over the network,
we can use this pair of functions as a somewhat inefficient way of creating a
deep copy of an object: */
// Make a deep copy of any serializable object or array
function deepcopy(o) {
    return JSON.parse(JSON.stringify(o));
}

/* Both functions accept an optional second argument that allows us to extend the
JSON format, and these are described next. JSON.stringify() also takes an optional
third argument that we’ll discuss first. If you would like your JSON-formatted string
to be human-readable (if it is being used as a configuration file, for example), then
you should pass null as the second argument and pass a number or string as the
third argument. This third argument tells JSON.stringify() that it should format
the data on multiple indented lines. If the third argument is a number, then it will use
that number of spaces for each indentation level. If the third argument is a string of
whitespace (such as '\t'), it will use that string for each level of indent. 

JSON.parse() ignores whitespace, so passing a third argument to JSON.stringify()
has no impact on our ability to convert the string back into a data structure. */

let oo = {s: "test", n: 0};
JSON.stringify(oo, null, 2)                             // => '{\n "s": "test",\n "n": 0\n}'



// 11.6.1 JSON Customizations
/* a call to JSON.parse() that uses a reviver function to filter
some properties and to re-create Date objects: */
let data = JSON.parse(text, function(key, value) {
    // Remove any values whose property name begins with an underscore
    if (key[0] === "_") return undefined;
    // If the value is a string in ISO 8601 date format convert it to a Date.
    if (typeof value === "string" &&
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
        return new Date(value);
    }
    // Otherwise, return the value unchanged
    return value;
});

// Specify what fields to serialize, and what order to serialize them in
let text = JSON.stringify(address, ["city","state","country"]);

// Specify a replacer function that omits RegExp-value properties
let json = JSON.stringify(o, (k, v) => v instanceof RegExp ? undefined : v);

/* The two JSON.stringify() calls here use the second argument in a benign way, producing
serialized output that can be deserialized without requiring a special reviver
function. In general, though, if you define a toJSON() method for a type, or if you use
a replacer function that actually replaces nonserializable values with serializable ones,
then you will typically need to use a custom reviver function with JSON.parse() to
get your original data structure back. If you do this, you should understand that you
are defining a custom data format and sacrificing portability and compatibility with a
large ecosystem of JSON-compatible tools and languages. */
