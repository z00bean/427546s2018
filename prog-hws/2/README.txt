README.txt
*** Computer Graphics I -- Programming Assignment 2: 2D Drawing ***
-Zubin Bhuyan (Student id: 01744486)

Files:
    --index.html
    --wheel.html
    --wheel.js
    --fractals.html
    --f1.js
    --README.txt

index.html has links to both the assignments.

Wheel assignment:
    Score and Radius has to be given by user as input. Since the wheel will not
    be visible if the radius is small, a minimum radius has been imposed.

    Extra features:
        1. Validation of inputs
        2. Option to choose THICKNESS of stroke.
        3. Option to choose RGB color.
        4. Option to fill the wheel with color.
        5. Type of wheel is displayed (whether the driver gets a circle, 
            ellipse or polygon of n sides).

Fractal assignment:
    User can give ratio and iterations as input. (The Arc fractal has svere bugs
    and will not work as intended.)
    Features:
        1. Validation of inputs.
        2. Option to choose thickness.
        3. For the line fractal, a "NEXT ITERATION" has been implemented
            which draws the next iteration.
~WARNING: If a very large value of iteration/ratio is given, the browser might 
            take a long time to display the result, or it might even crash.