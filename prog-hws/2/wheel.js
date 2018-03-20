var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var score = 0;
var radius = 10;
var thickness = 2;

var red = document.getElementById("red").value;
var green = document.getElementById("green").value;
var blue = document.getElementById("blue").value;
var strokeColor = "rgb("+red.toString()+","+green.toString()+","+blue.toString();
var fillColor = "#fcfcfc";

function clrCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("pMessage").innerHTML = "Click the \"Draw wheel\" button!";
  }

//Circle drawing function
function drawCircle(radius, thickness){
  var Xcenter = Math.floor(width/2),
      Ycenter = Math.floor(height/2);
      ctx.beginPath();
      ctx.arc(Xcenter, Ycenter, radius, 0, 2 * Math.PI);

      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
    
      ctx.fill();
      //console.log(thickness);
      ctx.lineWidth = thickness;
      ctx.stroke();
}

//Ellipse drawing function
function drawEllipse(rx, ry, thickness){
  var Xcenter = Math.floor(width/2),
      Ycenter = Math.floor(height/2);

      ctx.beginPath();
      ctx.ellipse(Xcenter, Ycenter, rx, ry, 0, 0, 2 * Math.PI, false);

      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
    
      ctx.fill();
      //console.log(thickness);
      ctx.lineWidth = thickness;
      ctx.stroke();
}

//Polygon drawing function
function drawPolygon(sides, radius, thickness){
  var numberOfSides = sides,
      size = radius,
      Xcenter = Math.floor(width/2),
      Ycenter = Math.floor(height/2);

  ctx.beginPath();
  ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

  for (var i = 1; i <= numberOfSides;i += 1) {
    ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;

  ctx.fill();
  //console.log(thickness);
  ctx.lineWidth = thickness;
  ctx.stroke();
}

function fillWheel(){
  if(document.getElementById('chkColor').checked){
    fillColor = strokeColor; //"#e0e0f0";  //fill with shade
  }
  else
    fillColor = "#fcfcfc";  //no fill

    drawWheel();
}

function drawWheel(){
  clrCanvas();
  score = parseInt(document.getElementById('txtScore').value);
  radius = 2 * parseInt(document.getElementById('txtRadius').value);
  thickness = parseInt(document.getElementById('sldThickness').value);

  //Validating score
  if(isNaN(score) || score < 0 || score > 100) {
    document.getElementById('txtScore').value = "";
    document.getElementById('txtScore').focus();
    ctx.font = "15px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Input given is invalid.",20,height/2);
    document.getElementById("pMessage").innerHTML = "Invalid invalid.";
    return;
  }

  //Validating radius: range 20-200
  if(isNaN(radius) || radius < 20 || radius > 200) {
    document.getElementById('txtRadius').value = "";
    document.getElementById('txtRadius').focus();
    ctx.font = "15px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Input given is invalid.",20,height/2);
    document.getElementById("pMessage").innerHTML = "Invalid invalid.";
    return;
  }

  //Setting color
  red = document.getElementById("red").value;
  green = document.getElementById("green").value;
  blue = document.getElementById("blue").value;
  strokeColor = "rgb("+red.toString()+","+green.toString()+","+blue.toString();
 
  if(document.getElementById('chkColor').checked){
    fillColor = strokeColor; //"#e0e0f0";  //fill with shade
  }
  else
    fillColor = "#fcfcfc";  //no fill


  if(score == 100){
    document.getElementById("pMessage").innerHTML = "Wheel type: Circle";
    drawCircle(radius, thickness);
    return;
  } else if(score >= 80){
      var rx = radius;
      var pc = (100 - score);
      var ry = rx - rx*pc/100;
      //console.log((rx));
      //console.log(ry);
      drawEllipse(rx, ry, thickness)
      document.getElementById("pMessage").innerHTML = "Wheel type: Ellipse. Ry = Rx -" + pc +"% * Rx";
      return;
  } else if(score >= 4){
    document.getElementById("pMessage").innerHTML = "Wheel type: Polygon of "+score+" sides.";
    drawPolygon(score, radius, thickness);
    return;
  }
  else {
    //Move to a function.
    ctx.font = "15px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("You are not eligible to DRIVE.",20,height/2);
    document.getElementById("pMessage").innerHTML = "You are not eligible to DRIVE.";
  }
}