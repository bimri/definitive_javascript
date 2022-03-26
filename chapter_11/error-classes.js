// 11.5 Error Classes

class HTTPError extends Error {
    constructor(status, statusText, url) {
        super(`${status} ${statusText}: ${url}`);
        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }
    get name() { return "HTTPError"; }
}

let error = new HTTPError(404, "Not Found", "http://africa-example.com/");
error.status            // => 404
error.message           // => "404 Not Found: http://africa-example.com/"
error.name              // => "HTTPError"
