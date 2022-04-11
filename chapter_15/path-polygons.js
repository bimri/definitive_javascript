// 15.8.1 Paths and Polygons
/* To draw lines on a canvas and to fill the areas enclosed by those lines, you begin by
defining a path. A path is a sequence of one or more subpaths. A subpath is a
sequence of two or more points connected by line segments. Begin a new path with the beginPath() 
method. Begin a new subpath with the moveTo() method. Once you have established the starting point of a
subpath with moveTo(), you can connect that point to a new point with a straight line
by calling lineTo(). */

// Define a regular polygon with n sides, centered at (x,y) with radius r.
// The vertices are equally spaced along the circumference of a circle.
// Put the first vertex straight up or at the specified angle.
// Rotate clockwise, unless the last argument is true.
function polygon(c, n, x, y, r, angle=0, counterclockwise=false) {
    c.moveTo(x + r*Math.sin(angle),             // Begin a new subpath at the first vertex
    y - r*Math.cos(angle));                     // Use trigonometry to compute position
    let delta = 2*Math.PI/n;                    // Angular distance between vertices
    for(let i = 1; i < n; i++) {                // For each of the remaining vertices
        angle += counterclockwise?-delta:delta; // Adjust angle
        c.lineTo(x + r*Math.sin(angle),         // Add line to next vertex
        y - r*Math.cos(angle));
    }
    c.closePath();                              // Connect last vertex back to the first
}

// Assume there is just one canvas, and get its context object to draw with.
let c = document.querySelector("canvas").getContext("2d");
    
// Start a new path and add polygon subpaths
c.beginPath();
polygon(c, 3, 50, 70, 50);                      // Triangle
polygon(c, 4, 150, 60, 50, Math.PI/4);          // Square
polygon(c, 5, 255, 55, 50);                     // Pentagon
polygon(c, 6, 365, 53, 50, Math.PI/6);          // Hexagon
polygon(c, 4, 365, 53, 20, Math.PI/4, true);    // Small square inside the hexagon
    
// Set some properties that control how the graphics will look
c.fillStyle = "#ccc";                           // Light gray interiors
c.strokeStyle = "#008";                         // outlined with dark blue lines
c.lineWidth = 5;                                // five pixels wide.

// Now draw all the polygons (each in its own subpath) with these calls
c.fill();                                       // Fill the shapes
c.stroke();                                     // And stroke their outlines


/* For optimum image quality, you should not use the width and height attributes to
set the on-screen size of the canvas. Instead, set the desired on-screen size CSS pixel
size of the canvas with CSS width and height style attributes. Then, before you begin
drawing in your JavaScript code, set the width and height properties of the canvas
object to the number of CSS pixels times window.devicePixelRatio. */


// SVG graphics, which remain crisp no matter the
// on-screen size or zoom level.
