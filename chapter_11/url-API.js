// 11.9 URL APIs

let url0 = new URL("https://example.com:8000/path/name?q=term#fragment");
url0.href                // => "https://example.com:8000/path/name?q=term#fragment"
url0.origin              // => "https://example.com:8000"
url0.protocol            // => "https:"
url0.host                // => "example.com:8000"
url0.hostname            // => "example.com"
url0.port                // => "8000"
url0.pathname            // => "/path/name"
url0.search              // => "?q=term"
url0.hash                // => "#fragment"

/* Although it is not commonly used, URLs can include a username or a username and
password, and the URL class can parse these URL components, too: */
let url1 = new URL("ftp://admin:1337!@ftp.example.com/");
url1.href               // => "ftp://admin:1337!@ftp.example.com/"
url1.origin             // => "ftp://ftp.example.com"
url1.username           // => "admin"
url1.password           // => "1337!"

/* The origin property here is a simple combination of the URL protocol and host
(including the port if one is specified). As such, it is a read-only property. But each of
the other properties demonstrated in the previous example is read/write: you can set
any of these properties to set the corresponding part of the URL: */
let url2 = new URL("https://example.com"); // Start with our server
url2.pathname = "api/search";           // Add a path to an API endpoint
url2.search = "q=test";                 // Add a query parameter
url2.toString()                         // => "https://example.com/api/search?q=test"

/* One of the important features of the URL class is that it correctly adds punctuation
and escapes special characters in URLs when that is needed: */
let url3 = new URL("https://example.com");
url3.pathname = "path with spaces";
url3.search = "q=foo#bar";
url3.pathname                           // => "/path%20with%20spaces"
url3.search                             // => "?q=foo%23bar"
url3.href                               // => "https://example.com/path%20with%20spaces?q=foo%23bar"

/* URLSearchParams object, which has an API for getting, setting, adding, deleting, and
sorting the parameters encoded into the query portion of the URL: */
let url = new URL("https://example.com/search");
url.search                              // => "": no query yet
url.searchParams.append("q", "term");   // Add a search parameter
url.search                              // => "?q=term"
url.searchParams.set("q", "x");         // Change the value of this parameter
url.search                              // => "?q=x"
url.searchParams.get("q")               // => "x": query the parameter value
url.searchParams.has("q")               // => true: there is a q parameter
url.searchParams.has("p")               // => false: there is no p parameter
url.searchParams.append("opts", "1");   // Add another search parameter
url.search                              // => "?q=x&opts=1"
url.searchParams.append("opts", "&");   // Add another value for same name
url.search                              // => "?q=x&opts=1&opts=%26": note escape
url.searchParams.get("opts")            // => "1": the first value
url.searchParams.getAll("opts")         // => ["1", "&"]: all values
url.searchParams.sort();                // Put params in alphabetical order
url.search                              // => "?opts=1&opts=%26&q=x"
url.searchParams.set("opts", "y");      // Change the opts param
url.search                              // => "?opts=y&q=x"
// searchParams is iterable
// [...url.searchParams] // => [["opts", "y"], ["q", "x"]]
url.searchParams.delete("opts");        // Delete the opts param
url.search                              // => "?q=x"
url.href                                // => "https://example.com/search?q=x"

/* The value of the searchParams property is a URLSearchParams object. If you want to
encode URL parameters into a query string, you can create a URLSearchParams
object, append parameters, then convert it to a string and set it on the search property
of a URL:*/
let url4 = new URL("http://example.com");
let params = new URLSearchParams();
params.append("q", "term");
params.append("opts", "exact");
params.toString()                       // => "q=term&opts=exact"
url4.search = params;
url4.href                               // => "http://example.com/?q=term&opts=exact"
