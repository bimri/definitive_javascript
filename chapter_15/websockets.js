// 15.11.3 WebSockets

/* The WebSocket API is a simple interface to a complex and powerful network protocol.
WebSockets allow JavaScript code in the browser to easily exchange text and
binary messages with a server. As with Server-Sent Events, the client must establish
the connection, but once the connection is established, the server can asynchronously
send messages to the client. Unlike SSE, binary messages are supported, and messages
can be sent in both directions, not just from server to client. */

// Creating, connecting, and disconnecting WebSockets
let socket = new WebSocket("wss://example.com/stockticker");
