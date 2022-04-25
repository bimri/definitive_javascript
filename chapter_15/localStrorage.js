// 15.12 Storage

// 15.12.1 localStorage and sessionStorage
let name = localStorage.username;               // Query a stored value.
if (!name) {
    name = prompt("What is your name?");        // Ask the user a question.
    localStorage.username = name;               // Store the user's response.
}

localStorage.clear();                           // Clear all stored values.


// Keep in mind that the properties of Storage objects can only store strings.

// If you store a number, it is automatically converted to a string.
// Don't forget to parse it when retrieving it from storage.
localStorage.x = 10;
let x = parseInt(localStorage.x);

// Convert a Date to a string when setting, and parse it when getting.
localStorage.lastRead = (new Date()).toUTCString();
let lastRead = new Date(Date.parse(localStorage.lastRead));

// JSON makes a convenient encoding for any primitive or data structure.
localStorage.data = JSON.stringify(data);           // Encode and store
let data = JSON.parse(localStorage.data);           // Retrieve and decode.


// 15.12.2 Cookies
// Return the document's cookoes as a Map Object.
// Assum that cookie calues are encoded with encodeURIComponent().
function getCookies() {
    let cookies = new Map();                        // The object we will return
    let all = document.cookie;                      // Get all cookies in one big string
    let list = all.split(";");                      // Split into individual name/value pairs
    for(let cookie of list) {                       // For each cookie in that list
        if (!cookie.includes("=")) continue;        // Skip if there is no = sign
        let p = cookie.indexOf("=");                // Find the fist = sign
        let name = cookie.substring(0, p);          // Get cookie name
        let value = cookie.substring(p+1);          // Get cookie value
        value = decodeURIComponent(value);          // Decode the value
        cookies.set(name, value);                   // Remember cookie name and value
    }
    return cookies;
}

// Storing cookies
/* To associate a transient cookie value with the current document, simply set the
cookie property to a name=value string. */
document.cookie = `version=${encodeURIComponent(document.lastModified)}`;


// Store the name/value pair as a cookie, encoding the value with
// encodeURIComponent() in order to escape semicolons, commas, and spaces.
// If daysToLive is a number, set the max-age attribute so that the cookie
// expires after the specified number of days. Pass 0 to delete a cookie.
function setCookie(name, value, daysToLive=null) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if (daysToLive !==null) {
        cookie += `; max-age=${daysToLive*60*60*24}`;
    }
    document.cookie = cookie;
}
