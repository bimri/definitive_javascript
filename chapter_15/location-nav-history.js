// 15.10 Location, Navigation, and History

/* URL objects have a searchParams property that is a parsed representation of the
search property. The Location object does not have a searchParams property, but if
you want to parse window.location.search, you can simply create a URL object
from the Location object and then use the URL’s searchParams: */
let url = new URL(window.location);
let query = url.searchParams.get("q")
let numResults = parseInt(url.searchParams.get("n") || "10");


// 15.10.1 Loading New Documents
window.location = "http://www.oreilly.com";         // Go buy some books!

/* You can also assign relative URLs to location. They are resolved relative to the current
URL: */
document.location = "page2.html";                   // Load the next page

/* A bare fragment identifier is a special kind of relative URL that does not cause the
browser to load a new document but simply to scroll so that the document element
with id or name that matches the fragment is visible at the top of the browser window. */
location = "#top";                                  // Jump to the top of the document

/* The individual properties of the Location object are writable, and setting them
changes the location URL and also causes the browser to load a new document (or, in
the case of the hash property, to navigate within the current document): */
document.location.path = "pages/3.html";            // Load a new page
document.location.hash = "TOC";                     // Scroll to the table of contents
location.search = "?page=" + (page+1);              // Reload with new query string


// If the browser does not support the JavaScript APIs we need,
// redirect to a static page that does not use JavaScript.
if (!isBrowserSupported()) location.replace("staticpage.html");


// 15.10.2 Browsing History
/* The History object has back() and forward() methods that behave like the browser’s
Back and Forward buttons do: they make the browser go backward or forward one
step in its browsing history. A third method, go(), takes an integer argument and can
skip any number of pages forward (for positive arguments) or backward (for negative
arguments) in the history list: */
history.go(-2);                                 // Go back 2, like clicking the Back button twice
history.go(0);                                  // Another way to reload the current page
