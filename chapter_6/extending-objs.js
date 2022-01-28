// 6.7 Extending Objects

/*
A common operation in JavaScript programs is needing to copy the properties of one
object to another object.
*/

let target = {x: 1}, source = {y: 2, z: 3};
for (let key of Object.keys(source)) {
    target[key] = source[key];
}
target                                                  // => {x: 1, y: 2, z: 3}


/* 
One reason to assign properties from one object into another is when you have an
object that defines default values for many properties and you want to copy those
default properties into another object if a property by that name does not already
exist in that object. Using Object.assign() naively will not do what you want:
*/
Object.assign(o, defaults);                             // overwrites everything in o with defaults


/*
Instead, what you can do is to create a new object, copy the defaults into it, and then
override those defaults with the properties in o:
*/
o = Object.assign({}, defaults, o);                     // o now has all the defaults and o's properties


/* 
We could also avoid the overhead of the extra object creation and copying by writing
a version of Object.assign() that copies properties only if they are missing:
*/

// Like Object.assign() but doesn't override existing properties
// (and also doesn't handle Symbol properties)
function merge(target, ...sources) {
    for(let source of sources) {
        for (let key of Object.keys(source)) {
            if (!key in target)     {                       // this is difference than Object.assign()
                target[key] = source[key];
            }
        }
    }
    return target;
}
Object.assign({x: 1}, {x: 2, y: 2}, {y: 3, z: 4})           // => {x: 2, y: 3, z: 4}
merge({x: 1}, {x: 2, y: 2}, {y: 3, z: 4})                   // => {x: 1, y: 2, z: 4}
