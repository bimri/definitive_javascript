// 15.11 Networking

// 15.11.1 fetch()
fetch("api/users/current")                      // Make an HTTP (or HTTPS) GET request
    .then(response => response.json())          // Parse its body as a JSON object
    .then(currentUser => {
        displayUserInfo(currentUser);
});

/**
 * Here’s a similar request made using the async and await keywords to an API that
   returns a plain string rather than a JSON object:
*/
async function isServiseReady() {
    let response = await fetch("/api/service/status");
    let body = await response.text();
    return body === "ready"; 
}

// HTTP status codes, response headers, and network errors
fetch("/api/users/current")                     // Make an HTTP (or HTTPS) GET request.
    .then(response => {                         // When we get a response, first check it
        if(response.ok &&                       // for a success code and the expected type.
            response.headers.get("Content-Type") === "application/json") {
                return response.json();         // Return a Promise for the body.
            } else {
                throw new Error(               // Or throw an error.
                    `Unexpected response status ${response.status} or content type`
                );
            }

    })
    .then(currentUser => {                      // When the response.json() Promise resolves
        displayUserInfo(currentUser);           // do something with the parsed body/
    })
    .catch(error => {                           // Or if anything went wrong, just log the error/
        // If the user's browser if offline, fetch() itself will reject.
        // If the server returns a bad response then we throw an error above.
        console.log("Error while fetching current user:", error);
});

// The Headers object is also iterable if you ever need to do that:
fetch(url).then(response => {
    for (let [name, value] of response.headers) {
        console.log(`$[name]: ${value}`);
    }
});


// Setting request parameters
async function search(term) {
    let url = new URL("/api/search");
    url.searchParams.set("q", term);
    let response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    let resultsArray = await response.json();
    return resultsArray;
}


// Setting request headers
let authHeaders = new Headers();
// Don't use Basic auth unless it is over an HTTPS connection.
authHeaders.set("Authorization",
                `Basic ${btoa(`${username}:${password}`)}`);
fetch("/api/users/", { headers: authHeaders })
    .then(response => response.json())                  // Error handling omitted...
    .then(usersList => displayAllUsers(usersList));
