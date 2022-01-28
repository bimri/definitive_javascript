// 6.8 Serializing Objects

/* 
Object serialization is the process of converting an object’s state to a string from
which it can later be restored. The functions JSON.stringify() and JSON.parse()
serialize and restore JavaScript objects. These functions use the JSON data interchange
format. JSON stands for “JavaScript Object Notation,” and its syntax is very
similar to that of JavaScript object and array literals:
*/

let o = {x: 1, y: {z: [false, null, ""]}};              // Define a test object
let s = JSON.stringify(o);                              // s == '{"x":1,"y":{"z":[false,null,""]}}'
let p = JSON.parse(s);                                  // p == {x: 1, y: {z: [false, null, ""]}}


/*
JSON syntax is a subset of JavaScript syntax, and it cannot represent all JavaScript values.
Objects, arrays, strings, finite numbers, true, false, and null are supported and
can be serialized and restored. NaN, Infinity, and -Infinity are serialized to null.

Date objects are serialized to ISO-formatted date strings (see the Date.toJSON()
function), but JSON.parse() leaves these in string form and does not restore the original
Date object.

Function, RegExp, and Error objects and the undefined value cannot
be serialized or restored. JSON.stringify() serializes only the enumerable own
properties of an object.

JSON.stringify() serializes only the enumerable own properties of an object.

Both JSON.stringify() and JSON.parse()
accept optional second arguments that can be used to customize the serialization
and/or restoration process by specifying a list of properties to be serialized
*/
 