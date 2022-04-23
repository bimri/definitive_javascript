// 15.11.2 Server-Sent Events

/* To create this kind of
long-lived request connection to a web server, simply pass a URL to the Even
tSource() constructor. When the server writes (properly formatted) data to the connection,
the EventSource object translates those into events that you can listen for: */

let ticker = new EventSource("stochprices.php");
ticker.addEventListener("bid", (event) => {
    displayNewBid(event.data);
});
