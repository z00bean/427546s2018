var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var ratio = parseInt(document.getElementById("txtRatio").value);
var iterations = parseInt(document.getElementById("txtIterations").value);;

var xPoints = [140, width - 140];
var yPoints = [height/2, height/2];

var thickness = 1;

//Draw initial line
ctx.beginPath();
ctx.moveTo(xPoints[0], yPoints[0]);
ctx.lineTo(xPoints[1], yPoints[1]);

ctx.lineWidth = thickness;
ctx.stroke();

function clrCanvas() {
    xPoints = [140, width - 140];
    yPoints = [height/2, height/2];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Enabling text boxes and radio buttons
    document.getElementById('radioLine').disabled = false;
    document.getElementById('radioArc').disabled = false;
    document.getElementById('txtRatio').disabled = false;
    document.getElementById('txtIterations').disabled = false;
    document.getElementById('btnDrawFrac').disabled = false;

    document.getElementById('btnDrawFrac').disabled = false;
    document.getElementById("pMessage").innerHTML = "Fractals! If the iteration/ratio value is set over 6, the processing might be slow.";
    document.getElementById("btnNextIter").style.visibility = "hidden";
    document.getElementById("radioLine").checked = true;

    //Draw initial line
    ctx.beginPath();
    ctx.moveTo(xPoints[0], yPoints[0]);
    ctx.lineTo(xPoints[1], yPoints[1]);
    ctx.strokeStyle="#000000";
    ctx.lineWidth = thickness;
    ctx.stroke();
}

function computePointsTri(){
    var i = 1;
    var j = 0;
    var tempNewCoordX = 0;
    var tempNewCoordY = 0;
    var t1  = new Array();
    var t2  = new Array();
    
    //Compute ratio points
    t1.push(xPoints[0]);
    t2.push(yPoints[0]);
    for(i = 1; i < xPoints.length; i++){
        for(j = 1; j < ratio; j++){
            tempNewCoordX = xPoints[i-1] + (xPoints[i]-xPoints[i-1])/ratio*j;
            tempNewCoordY = yPoints[i-1] + (yPoints[i]-yPoints[i-1])/ratio*j;
            t1.push(tempNewCoordX);
            t2.push(tempNewCoordY);
        }
        t1.push(xPoints[i]);
        t2.push(yPoints[i]);
    }
    
    xPoints = t1;
    yPoints = t2;

    //reinitialize temp variables
    t1 = [];
    t2 = [];

    //compute remaining vertices
    t1.push(xPoints[0]);
    t2.push(yPoints[0]);
    var flag = false;
    for(i = 1; i < xPoints.length; i++){
            //computing point
            var x1 = xPoints[i-1];
            var x2 = xPoints[i];
            var y1 = yPoints[i-1];
            var y2 = yPoints[i];
            var theta = Math.atan((y2-y1)/(x2-x1));
            var distCD = Math.sqrt(3)*Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
          
            if(flag){
                tempNewCoordX = (x1+x2)/2 + (distCD/2)*Math.sin(theta);
                tempNewCoordY = (y1+y2)/2 - (distCD/2)*Math.cos(theta)
                flag = false;
            }
            else{
                tempNewCoordX = (x1+x2)/2 - (distCD/2)*Math.sin(theta);
                tempNewCoordY = (y1+y2)/2 + (distCD/2)*Math.cos(theta)
                flag = true;
            }
            t1.push(tempNewCoordX);
            t2.push(tempNewCoordY);

            t1.push(xPoints[i]);
            t2.push(yPoints[i]);
    }
    //t1.push(xPoints[xPoints.length-1])
    //t2.push(yPoints[yPoints.length-1])
    xPoints = t1;
    yPoints = t2;

}

function computePointsCircle(){
    var i = 1;
    var j = 0;
    var tempNewCoordX = 0;
    var tempNewCoordY = 0;
    var t1  = new Array();
    var t2  = new Array();
    //Compute ratio points
    t1.push(xPoints[0]);
    t2.push(yPoints[0]);
        
    /*
    for(i = 1; i < xPoints.length; i++){
        var cx = (xPoints[i-1]+xPoints[i])/2;
        var cy = (yPoints[i-1]+yPoints[i])/2;
        var rad = Math.sqrt(sq(xPoints[i-1]-xPoints[i])+sq(yPoints[i-1]-yPoints[i]))/2;
        var angle = (Math.PI/180) * Math.atan((yPoints[i-1]-yPoints[i])/(xPoints[i-1]-xPoints[i]));
        console.log("angle: "+ angle);
        for(j = 1; j < ratio; j++){
            //tempNewCoordX = cx + rad*Math.cos(angle/ratio*j);//* (180 / Math.PI);
            //tempNewCoordY = cy + rad*Math.sin(angle/ratio*j);//* (180 / Math.PI);
            tempNewCoordX = cx + rad * Math.cos(1/180*ratio);
            tempNewCoordY = cy + rad * Math.sin(1/180*ratio);
            t1.push(tempNewCoordX);
            t2.push(tempNewCoordY);
        }
        t1.push(xPoints[i]);
        t2.push(yPoints[i]);
    }
    */
   
    for(i = 1; i < iterations; i++)
    {
        t1.push(((iterations-i)*xPoints[0]+(i)*xPoints[1])/iterations);
        t2.push(yPoints[0]);
    }
    /*
   t1.push((3*xPoints[0]+1*xPoints[1])/4);
   t2.push(yPoints[0]);

   t1.push((2*xPoints[0]+2*xPoints[1])/4);
   t2.push(yPoints[0]);

   t1.push((xPoints[0]+3*xPoints[1])/4);
   t2.push(yPoints[0]);
*/
   //Push last point
   t1.push(xPoints[1]);
   t2.push(yPoints[1]);
   /*
   t1.push(xPoints[1]+20);
   t2.push(yPoints[1]);
   t1.push(xPoints[1]+30);
   t2.push(yPoints[1]-40);
   */

    xPoints = t1;
    yPoints = t2;
    console.log(xPoints);
    console.log(yPoints);
}

function drawLinesPointToPoint(){
    var i = 1;

    computePointsTri();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(xPoints[0], yPoints[0]);
    while(i <= xPoints.length-1){
        ctx.lineTo(xPoints[i], yPoints[i]);
        i++;
    }
    thickness = parseInt(document.getElementById('sldThickness').value);
    ctx.lineWidth = thickness;
    ctx.stroke();
}

function findCenters(r, p1, p2) {
    // pm is middle point of (p1, p2)
    var pm = { x : 0.5 * (p1.x + p2.x) , y: 0.5*(p1.y+p2.y) } ;
    //drawPoint(pm, 'PM (middle)');
    console.log("Centre calculated");
    // compute leading vector of the perpendicular to p1 p2 == C1C2 line
    var perpABdx= - ( p2.y - p1.y );
    var perpABdy = p2.x - p1.x;
    // normalize vector
    var norm = Math.sqrt(sq(perpABdx) + sq(perpABdy));
    perpABdx/=norm;
    perpABdy/=norm;
    // compute distance from pm to p1
    var dpmp1 = Math.sqrt(sq(pm.x-p1.x) + sq(pm.y-p1.y));
    // sin of the angle between { circle center,  middle , p1 } 
    var sin = dpmp1 / r ;
    // is such a circle possible ?
    if (sin<-1 || sin >1) return null; // no, return null
    // yes, compute the two centers
    var cos = Math.sqrt(1-sq(sin));   // build cos out of sin
    var d = r*cos;
    var res1 = { x : pm.x + perpABdx*d, y: pm.y + perpABdy*d };
    var res2 = { x : pm.x - perpABdx*d, y: pm.y - perpABdy*d };
    return { c1 : res1, c2 : res2} ; 
}
//util fun1
function sq(x) { return x*x ; }

//util fun2
function drawPoint(p, name) {
  ctx.fillRect(p.x - 1,p.y - 1,2, 2);
  ctx.textAlign = 'center';
  ctx.fillText(name, p.x, p.y+10);
}
//util fun3
function drawCircle(c, r) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, 6.28);
  ctx.strokeStyle='#000';
  ctx.stroke();
}
//util fun4
function drawCircleArc(c, r, p1, p2, col, direction) {
    var ang1 = Math.atan2(p1.y-c.y, p1.x-c.x);
    var ang2 = Math.atan2(p2.y-c.y, p2.x-c.x);
    ctx.beginPath();
    var clockwise = direction ;
    ctx.arc(c.x, c.y, r, ang1, ang2, clockwise);
    ctx.strokeStyle=col;

    ctx.lineWidth = thickness;
    ctx.stroke();
}


function drawSemiCircles(){
    var i = 1;

    computePointsCircle();

    var initialPoint;
    var finalPoint;
    var radius;
    var direction = false;
    
    var centers;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while(i <= xPoints.length-1){
        initialPoint = { x: xPoints[i-1], y: yPoints[i-1] };
        finalPoint = { x: xPoints[i], y: yPoints[i] };
        radius = Math.sqrt(sq(xPoints[i-1]-xPoints[i])+sq(yPoints[i-1]-yPoints[i]))/2;
        console.log("Radius= "+radius);
        if(direction == true) direction = false; else direction = true;

        centers = findCenters(radius,initialPoint, finalPoint );
        
        drawCircleArc(centers.c1, radius, initialPoint, finalPoint, '#F99', direction );

        i++;
    }
}

function main(){
    var i = 0;
    //TODO
    //validate input
    if(isNaN(parseInt(document.getElementById("txtRatio").value)) || parseInt(document.getElementById("txtRatio").value) < 2){
        document.getElementById("txtRatio").value = "";
        document.getElementById("txtRatio").focus();
        return;
    }
    if(isNaN(parseInt(document.getElementById("txtIterations").value)) || parseInt(document.getElementById("txtIterations").value) < 1){
        document.getElementById("txtIterations").value = "";
        document.getElementById("txtIterations").focus();
        return;
    }
    //ratio value greater than 1.
    //Handle case for Ratio = 1 and iteration = 1.

    thickness = parseInt(document.getElementById('sldThickness').value);

    ratio = parseInt(document.getElementById("txtRatio").value);
    iterations = parseInt(document.getElementById("txtIterations").value);


    //Disabling text boxes and radio buttons
    document.getElementById('radioLine').disabled = true;
    document.getElementById('radioArc').disabled = true;
    document.getElementById('txtRatio').disabled = true;
    document.getElementById('txtIterations').disabled = true;
    document.getElementById('btnDrawFrac').disabled = true;
    document.getElementById('pMessage').innerHTML = "Buttons and text inputs disabled. Click \"Clear Canvas\" to draw again.";
    document.getElementById("btnNextIter").style.visibility = "visible";

{
    if(document.getElementById("radioLine").checked == true){
        for(i = 0; i < iterations; i++)
            drawLinesPointToPoint();
        }
        else
        {
            if(iterations == 3)
                document.getElementById('txtIterations').value = "4";
            if(iterations == 6 || iterations == 7)
            document.getElementById('txtIterations').value = "8";
            if(iterations == 9 )
            document.getElementById('txtIterations').value = "10";


             iterations = parseInt(document.getElementById("txtIterations").value);
            drawSemiCircles();
            document.getElementById("btnNextIter").style.visibility = "hidden";
            document.getElementById("txtRatio").value = "2";
        }
    }
    /*
    for(i = 0; i < iterations; i++){
        if(document.getElementById("radioLine").checked = true)
            drawLinesPointToPoint();
        else
            drawSemiCircles();
    }*/

  }