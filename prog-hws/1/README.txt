README.txt
*** Computer Graphics I -- Programming Assignment 1: 2D Drawing ***
-Zubin Bhuyan (Student id: 01744486)

This submission comprises of the following files:
    - index.html
    - canvas_draw.js
    - README.txt
    - a folder containing .js files. The midpoint algorithms were implemented seperately in these files.
The individual implementations were later incorporated in a single file, canvas_draw.js.

Targets achieved:
    1. Implemented 3 Midpoint algorithms for line, circle, and ellipse.
    2. Option to draw Rectangles
    3. Option to draw (open) polylines
    4. Option to draw polygons.

    5. "Rubberbanding" for all drawings.
    6. Option to choose line thickness (1-4 px thick).
    7. Slider to choose color (3 sliders for reg, green and blue).

Point primitive:
Pixels/Points are drawn as small squares. Depending on the thickness selected, these squares can be of
size (1, 1) to (4, 4). The method DrawPixel is called repetitively to draw the shapes.

Basic shape methods:
The functions DrawLine(), DrawCircle() and DrawEllipse() are used to draw lines, circles and ellipses
respectively.

Polygons and Polylines:
To draw a polylineor a polygon, start by selecting he appropriate radio button; then, CLICK on the
canvas to begin drawing. RIGHT-CLICK to add a new points, and LEFT-CLICK to add the last point.