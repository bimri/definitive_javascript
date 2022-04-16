// c 15.8.4 Canvas Drawing Operations
"Adding curves to a path"

// A utility function to convert angles from degrees to radians
function rads(x) { return Math.PI * x/180; }

// Get the context object of the document's canvas element
let c = document.querySelector("canvas").getContext("2d");

// Define some graphics attributes and draw the curves
c.fillStyle = "#aaa";           // Gray fills
c.lineWidth = 2;                // 2-pixel black (by default) lines

// Draw a circle.
// There is no current point, so draw just the circle with no straight
// line from the current point to the start of the circle.
c.beginPath();
c.arc(75, 100, 50,              // Center at (75, 100), radius 50
    0, rads(360), false);       // Go clockwise from 0 to 360 degress
c.fill();                       // Fill the circle
c.stroke();                     // Stroke its outline.

// Now draw an ellipse in the same way
c.beginPath();                  // Start new path not connected to the circle
c.ellipse(200, 100, 50, 35, rads(15),       // Center, radii, and rotation
            0, rads(360), false);           // Start angle, end angle, direction

// Draw a wedge. Angles are measured clockwise from the positive x axis.
// Note that arc() adds a line from the current point to the arc start.
c.moveTo(325, 100);                 // Start at the center of the circle.
c.arc(325, 100, 50,                 // Circle center and radius
            rads(-60), rads(0),     // Start at angle -60 and go to angle 0
            true);                  // counterclockwise
c.closePath();                      // Add radius back to the center of the circle

// Similar wedge, offset a bit, and in the opposite direction
c.moveTo(340, 92);
c.arc(340, 92, 42, rads(-60), rads(0), false);
c.closePath();

// Use arcTo() for rounded corners. Here we draw a square with
// upper left corner at (400, 50) and corners of varying radii.
c.moveTo(450, 50);                  // Begin in the middle of the top edge.
c.arcTo(500,50,500,150,30);         // Add part of top edge and upper right corner.
c.arcTo(500,150,400,150,20);        // Add right edge and lower right corner.
c.arcTo(400,150,400,150,20);        // Add bottom edge and lower left corner.
c.arcTo(400,50,500,50,0);           // Add left edge and upper left corner.
c.closePath();                      // Close path to add the rest of the top edge.

// Quadratic Bezier curve: one control point
c.moveTo(525, 125);                         // Begin here
c.quadraticCurveTo(550, 75, 625, 125);      // Draw a curve to (625, 125)
c.fillRect(550-3, 75-3, 6, 6);              // Mark the control point (550, 75)

// Cubic Bezier curve
c.moveTo(625, 100);                         // Start at (625, 100)
c.bezierCurveTo(645,70,705,130,725,100);    // Curve to (725, 100)
c.fillRect(645-3,70-3,6,6);                 // Mark control points
c.fillRect(705-3, 130-3, 6, 6);

// Finally, fill the curves and stroke their outlines
c.fill();
c.stroke();


// Text
/* If you need to measure text yourself before drawing it, pass it to the measureText()
method. This method returns a TextMetrics object that specifies the measurements of
the text when drawn with the current font. This is useful if you want to center a 
string of text within a canvas, */
let width = c.measureText(text).width;


// Images
/* In addition to drawing images into a canvas, we can also extract the content of a canvas
as an image using the toDataURL() method. Unlike all the other methods
described here, toDataURL() is a method of the Canvas element itself, not of the context
object. You normally invoke toDataURL() with no arguments, and it returns the
content of the canvas as a PNG image, encoded as a string using a data: URL. The
returned URL is suitable for use with an <img> element, and you can make a static
snapshot of a canvas with code like this: */
let img = document.createElement("img");            // Create an <img> element
img.src = canvas.toDataURL();                       // Set its src attribute
document.body.appendChild(img);                     // Append it to the document

// 15.8.5 Coordinate System Transforms

// Shear transform:
// x' = x + kx*y;
// y' = ky*x + y;
function shear(c, kx, ky) { c.transform(1, ky, kx, 1, 0, 0); }

// Rotate theta radians counterclockwise around the point (x,y)
// This can also be accomplished with a translate, rotate, translate sequence
function rotateAbout(c, theta, x, y) {
    let ct = Math.cos(theta);
    let st = Math.sin(theta);
    c.transform(ct, -st, st, ct, -x*ct-y*st+x, x*st-y*ct+y);
}

/* The setTransform() method takes the same arguments as transform(), but instead
of transforming the current coordinate system, it ignores the current system, transforms
the default coordinate system, and makes the result the new current coordinate
system. setTransform() is useful to temporarily reset the canvas to its default coordinate
system: */
c.save(); // Save current coordinate system
c.setTransform(1,0,0,1,0,0); // Revert to the default coordinate system

// Perform operations using default CSS pixel coordinates
c.restore(); // Restore the saved coordinate system
