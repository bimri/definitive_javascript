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
