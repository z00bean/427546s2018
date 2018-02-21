
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight * 0.65;
ctx.fillStyle = 'blue';
var lineThickness;
console.log("before");

//Emulation of single pixel
var DrawPixel = function (x, y) {
    ctx.fillRect(x, y, lineThickness, lineThickness);
}

//Function to draw straight lines
var DrawLine = function (x0, y0, x1, y1) {
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    //Start point
    DrawPixel(x0, y0);
    var slopegt1 = false; 

    if(dy > dx){
        //console.log(x1);
        [x0, y0] = [y0, x0];
        [x1, y1] = [y1, x1];
        [dx, dy] = [dy, dx];
        slopegt1 = true;
        //console.log(x1);
    }
    if(x0 > x1){
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
    }
    if(y0 > y1)
        incY = -1;
    else
        incY = 1;
    
    d = 2 * dy -dx;
    incE = 2 * dy;
    incNE = 2 * (dy -dx);
    //DrawPixel(x0, y0);
    //console.log("Pixel drawn at y-pos",y0);
    while (x0 < x1) {
        if(d <= 0){   //E
            d = d + incE;}
        else{       //NE
            d += incNE;
            y0 += incY;
        }
        x0 += 1;
        if(slopegt1 == true)
            DrawPixel(y0, x0);  //DrawPixel(y0, maxY - x0);
        else
            DrawPixel(x0, y0);  //DrawPixel(x0, maxY - y0);
    } // end-while
}; //end-DrawLine method

//Method to draw circle
var DrawCirle = function (x0, y0, radius) {
    var x = radius;
    var y = 0;
    var d = 1 - x;
  
    while (x >= y) {
        DrawPixel(x + x0, y + y0);
        DrawPixel(y + x0, x + y0);
        DrawPixel(-x + x0, y + y0);
        DrawPixel(-y + x0, x + y0);
        DrawPixel(-x + x0, -y + y0);
        DrawPixel(-y + x0, -x + y0);
        DrawPixel(x + x0, -y + y0);
        DrawPixel(y + x0, -x + y0);
        y++;
    
        if (d < 0) {
            d += 2 * y + 1;
        }
        else {
            x--;
            d += 2 * (y - x + 1);
        }
    } // end-while
}; //end DrawCircle-method

var DrawEllipse = function (xc, yc, rx, ry) {
    //Region 1
   p=ry*ry-rx*rx*ry+rx*rx/4;
   x=0;
   y=ry;
   while(2.0*ry*ry*x <= 2.0*rx*rx*y){
        if(p < 0){
            x++;
            p = p+2*ry*ry*x+ry*ry;
        }
        else{
            x++;y--;
            p = p+2*ry*ry*x-2*rx*rx*y-ry*ry;
        }
	DrawPixel(xc+x,yc+y);
	DrawPixel(xc+x,yc-y);
	DrawPixel(xc-x,yc+y);
	DrawPixel(xc-x,yc-y);
   }
    //Region 2
    p=ry*ry*(x+0.5)*(x+0.5)+rx*rx*(y-1)*(y-1)-rx*rx*ry*ry;
    while(y > 0){
        if(p <= 0){
            x++;y--;
            p = p+2*ry*ry*x-2*rx*rx*y+rx*rx;
        }
        else{
            y--;
            p = p-2*rx*rx*y+rx*rx;
        }
        DrawPixel(xc+x,yc+y);
        DrawPixel(xc+x,yc-y);
        DrawPixel(xc-x,yc+y);
        DrawPixel(xc-x,yc-y);
    }

}; //end- drawEllipse method
//DrawLine(100, 200, 30, 10);
/*DrawLine(100, 200, 100, 10); */
var isDown = false; //draw only when isDown is TRUE
var x0 = 1;
var y0 = 1;
var shapes = document.getElementsByName('shape');
var selectedShape;
var polyLinePointsX = [];
var polyLinePointsY = [];

var red = 0;
var green = 150;
var blue = 255;
var colorToDrawWith = "rgb("+red.toString()+","+green.toString()+","+blue.toString();
function getSelectedShape(){
    for(var i = 0; i < shapes.length; i++){
        if(shapes[i].checked == true){
            selectedShape = shapes[i].value;
            console.log(selectedShape);
        }
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function(evt) {
    console.log("Left click");
    var mousePos = getMousePos(canvas, evt);
    x0 = mousePos.x;
    y0 = mousePos.y;
    isDown = !isDown;
    document.getElementById("penStatus").innerHTML = "Pen down: " + isDown;
    if(isDown == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        getSelectedShape();
        //diable buttons while drawing
        for(var i = 0; i < shapes.length; i++){
            shapes[i].disabled = true;
        }
        document.getElementById("rangeSlider").disabled = true;
        document.getElementById("red").disabled = true;
        document.getElementById("green").disabled = true;
        document.getElementById("blue").disabled = true;

        lineThickness = document.getElementById("rangeSlider").value;
        red = document.getElementById("red").value;
        green = document.getElementById("green").value;
        blue = document.getElementById("blue").value;
        colorToDrawWith = "rgb("+red.toString()+","+green.toString()+","+blue.toString();

        if(selectedShape == "polyOp" ||  selectedShape == "polyCl")
            document.getElementById("nowDrawing").innerHTML = "Move mouse to draw. RIGHT CLICK to add a point. CLICK to add the last point of the poly-line.";
        else
            document.getElementById("nowDrawing").innerHTML = "CLICK and move mouse to draw a " + selectedShape+"."+" CLICK again to FIX the shape.";
    }
    else{
        document.getElementById("nowDrawing").innerHTML = "CLICK to clear canvas and draw again.";
        for(var i = 0; i < shapes.length; i++){
            shapes[i].disabled = false;
        }
        document.getElementById("rangeSlider").disabled = false;
        document.getElementById("red").disabled = false;
        document.getElementById("green").disabled = false;
        document.getElementById("blue").disabled = false;
        if(selectedShape == "polyOp" && polyLinePointsX.length > 1)
        {
            DrawLine(x0, y0, polyLinePointsX[0], polyLinePointsY[0]);
        }
        polyLinePointsX = [];
        polyLinePointsY = [];
    }
}, false);

canvas.addEventListener('contextmenu', function(evt) {
    evt.preventDefault();    
    if(polyLinePointsX.length == 0)
        return;
    var mousePos = getMousePos(canvas, evt);
    polyLinePointsX.push(mousePos.x);
    polyLinePointsY.push(mousePos.y);
    x0 = mousePos.x;
    y0 = mousePos.y;
    console.log("right click");
}, false);

canvas.addEventListener('mousemove', function(evt) {
    if (!isDown) return;
    var mousePos = getMousePos(canvas, evt);
    if(isDown){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colorToDrawWith;
        console.log(selectedShape);
        if(selectedShape === "line")
        {
            DrawLine(x0, y0, mousePos.x, mousePos.y);
        }
        
        if(selectedShape == "circle"){
            var r = Math.sqrt(Math.pow((mousePos.y - y0), 2) + Math.pow((mousePos.x - x0), 2));
            if(r!=0)
                DrawCirle(x0, y0, r);
        }

        if(selectedShape == "ellipse"){
            var rx = Math.abs(mousePos.x - x0);
            var ry = Math.abs(mousePos.y - y0);
            if(rx != 0 && ry != 0)
                DrawEllipse(x0, y0, rx, ry);
        }

        if(selectedShape == "rect"){
            DrawLine(x0, y0, x0, mousePos.y);
            DrawLine(x0, y0, mousePos.x, y0);
            DrawLine(mousePos.x, y0, mousePos.x, mousePos.y);
            DrawLine(x0, mousePos.y, mousePos.x, mousePos.y);
        }

        if(selectedShape == "polyCl"){
            if(polyLinePointsX.length == 0){
                polyLinePointsX.push(mousePos.x);
                polyLinePointsY.push(mousePos.y);
                DrawLine(x0, y0, mousePos.x, mousePos.y);
            }
            else if(polyLinePointsX.length >= 1){
                for(i = 1; i <= polyLinePointsX.length; i++){
                    DrawLine(polyLinePointsX[i-1], polyLinePointsY[i-1], polyLinePointsX[i], polyLinePointsY[i]);
                }
            }
            DrawLine(x0, y0, mousePos.x, mousePos.y);
        }

        if(selectedShape == "polyOp"){
            if(polyLinePointsX.length == 0){
                polyLinePointsX.push(mousePos.x);
                polyLinePointsY.push(mousePos.y);
                DrawLine(x0, y0, mousePos.x, mousePos.y);
            }
            else if(polyLinePointsX.length >= 1){
                for(i = 1; i <= polyLinePointsX.length; i++){
                    DrawLine(polyLinePointsX[i-1], polyLinePointsY[i-1], polyLinePointsX[i], polyLinePointsY[i]);
                }
            }
            DrawLine(x0, y0, mousePos.x, mousePos.y);
        }

    }
  }, false);



