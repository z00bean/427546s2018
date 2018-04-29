var c1x1 = 90, c1y1 = 115;
var scaleX = 1, scaleY = 1;
var scaleChanged = 0;

function mouseDownC1(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  c1x1 = evt.clientX - rect.left;
  c1y1 = evt.clientY - rect.top;

  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  canvas.getContext('2d').fillStyle="#f0f0fa";
  ctx1.fillRect(0, 0, c1.width, c1.height);
  var img1 = new Image();
  img1.onload = function() {
    //ctx1.drawImage(img1, 0, 0, c1x1*300/500, c1y1*150/250);
    ctx1.drawImage(img1, 0, 0, c1x1 * 300/500, canvas.height-10);
  };
  img1.src = 'img/ssfront.png';
  scaleX = (c1x1 * 300/500) / (canvas.width/2.5);
  scaleChanged = 1;
  console.log("scaleX: "+scaleX);
  console.log("X:"+c1x1 + " Y: " + c1y1);
  console.log("canvas width:"+canvas.width + " canvas height: " + canvas.height);
  ctx1.fillStyle="#000000";
  ctx1.font = "9px Arial";
  ctx1.fillText("(CLICK) Front View",220,10);

  updateTopView();
}

//Front
var c1=document.getElementById("canvas1");

c1.addEventListener("mousedown", function(event){
  mouseDownC1(c1, event);
});
var ctx1=c1.getContext("2d");
ctx1.fillStyle="#f0f0fa";
ctx1.fillRect(0, 0, c1.width, c1.height);
var img1 = new Image();
ctx1.fillStyle="#000000";
ctx1.font = "9px Arial";
ctx1.fillText("(CLICK) Front View",220,10);
img1.onload = function() {

  ctx1.drawImage(img1, 0, 0, c1.width/2.5, c1.height-10);

};
img1.src = 'img/ssfront.png';

//Side handlers
var c2x1 = 90, c2y1 = 115;

function mouseDownC2(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  c2x1 = evt.clientX - rect.left;
  c2y1 = evt.clientY - rect.top;

  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  canvas.getContext('2d').fillStyle="#f0f0fa";
  ctx2.fillRect(0, 0, c1.width, c1.height);
  var img2 = new Image();
  img2.onload = function() {
    //ctx1.drawImage(img1, 0, 0, c1x1*300/500, c1y1*150/250);
    ctx2.drawImage(img2, 0, 0, c2x1 * 300/500, canvas.height-10);
  };
  img2.src = 'img/ssside.png';
  scaleY = (c2x1 * 300/500) / (canvas.width/2.5);
  scaleChanged = 1;
  console.log("scaleY: "+scaleY);
  console.log("C2 X:"+c2x1 + " C2 Y: " + c2y1);
  console.log("canvas width:"+canvas.width + " canvas height: " + canvas.height);
  ctx2.fillStyle="#000000";
  ctx2.font = "9px Arial";
  ctx2.fillText("(CLICK) Side view",220,10);

  updateTopView();
}

//Side
var c2=document.getElementById("canvas2");

c2.addEventListener("mousedown", function(event){
  mouseDownC2(c2, event);
});
var ctx2 = c2.getContext("2d");
ctx2.fillStyle="#f0f0fa";
ctx2.fillRect(0, 0, c2.width, c2.height);
var img2 = new Image();
ctx2.fillStyle="#000000";
ctx2.font = "9px Arial";
ctx2.fillText("(CLICK) Side view",220,10);
img2.onload = function() {

  ctx2.drawImage(img2, 0, 0, c2.width/2.5, c2.height-10);

};
img2.src = 'img/ssside.png';


//Top
function updateTopView() {
  c3.getContext('2d').clearRect(0, 0, c3.width, c3.height);

  c3.getContext('2d').fillStyle="#f0f0fa";
  ctx3.fillRect(0, 0, c3.width, c3.height);
  var img3 = new Image();
  img3.onload = function() {
    //ctx1.drawImage(img1, 0, 0, c1x1*300/500, c1y1*150/250);
    ctx3.drawImage(img3, 0, 0, c3.width/3 * scaleX, c3.width/3 * scaleY);
  };
  img3.src = 'img/sstop.png';
  ctx3.fillStyle="#000000";
  ctx3.font = "9px Arial";
  ctx3.fillText("Top view",255,10);
}
var c3=document.getElementById("canvas3");
var ctx3=c3.getContext("2d");
ctx3.fillStyle="#f0f0fa";
ctx3.fillRect(0, 0, c3.width, c3.height);
ctx3.fillStyle="#000000";
ctx3.font = "9px Arial";
ctx3.fillText("Top view",255,10);
var img3 = new Image();
img3.onload = function() {

  ctx3.drawImage(img3, 10, 0, c3.width/3, c3.width/3);

};
img3.src = 'img/sstop.png';

//end side, top views

var scene = new THREE.Scene();
var camera;
//camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera = new THREE.OrthographicCamera((window.innerWidth/150) / - 2, (window.innerWidth/150) / 2, (window.innerHeight/150) / 2, (window.innerHeight/150) / - 2, .1, 1000 );
//camera.position.z = 4;
camera.position.set( 60, 10, 15);

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.shadowMapType = THREE.PCFShadowMap; 

var rotateStatus = 0;
var ambLightStatus = 1;
var lightStatus = 0;
var cameraTypeChanged = 0;
var cameraType = 0; //0 for otho, 1 for perspective
var autoRotateCamera = 0;
var shearXY = 0;
var shearYZ = 0;
var shearZX = 0;
var shearChanged = 0;
var shadowStatus = 0;
var helperStatus = 0;

//SHEAR variables
var Syx = 0,
    Szx = 0,
    Sxy = 0,
    Szy = 0,
    Sxz = 0,
    Syz = 0;

// renderer clear color
renderer.setClearColor("#d0d0fa");
//renderer.setSize( document.getElementById('4').style.width, document.getElementById('4').style.height );
renderer.setSize( window.innerWidth/2.8, window.innerHeight/2.8 );
renderer.shadowMap.enabled = true;

window.addEventListener('resize', function(){
  //var width = document.getElementById('4').style.width;
  //var height = document.getElementById('4').style.height;
  var width = window.innerWidth/2.8;
  var height = window.innerHeight/2.8;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
});

function setRotateCamera(){
  if(document.getElementById("chkRotateCamera").checked == true){
    autoRotateCamera = 1;
  }
  else{
    autoRotateCamera = 0;
  }
};

function setHelper(){
  if(document.getElementById("chkHelper").checked == true){
    helperStatus = 1;
  }
  else{
    helperStatus = 0;
  }
  console.log("Shadow status:"+shadowStatus)
};

function setShadow(){
  if(document.getElementById("chkShadow").checked == true){
    shadowStatus = 1;
  }
  else{
    shadowStatus = 0;
  }
  console.log("Shadow status:"+shadowStatus)
};

function setAmbLight(){
  if(document.getElementById("chkAmbLight").checked == true){
    ambLightStatus = 1;
  }
  else{
    ambLightStatus = 0;
  }
  console.log("setAmbientLight = "+ambLightStatus);
};

function setDirLight(){
  if(document.getElementById("chkDirLight").checked == true){
    lightStatus = 1;
  }
  else{
    lightStatus = 0;
  }
  console.log("setLight = "+lightStatus);
};

function setRotate(){
    if(document.getElementById("chkRotate").checked == true){
      rotateStatus = 1;
    }
    else{
      rotateStatus = 0;
    }
    console.log("rotateStatus = "+rotateStatus);
  };

function setCameraType(){
    if(document.getElementById("ortho").checked == true)
      cameraType = 0;
    else
      cameraType = 1;
    cameraTypeChanged = 1;
  };

function setShearStatusXY(){
  if(document.getElementById("chkShearXY").checked == true){
    Sxy = 1;
    //document.getElementById("chkShearZX").disabled = true;
  }
  else{
    Sxy = -1;
    //document.getElementById("chkShearZX").disabled = false;
  }

  shearChanged = 1;
};
function setShearStatusYZ(){
  if(document.getElementById("chkShearYZ").checked == true){
    Syz = 1;
    //document.getElementById("chkShearXY").disabled = true;
  }
  else{
    Syz = -1;
    //document.getElementById("chkShearXY").disabled = false;
  }

  shearChanged = 1;
};
function setShearStatusZX(){
  if(document.getElementById("chkShearZX").checked == true){
    Szx = 1;
    //document.getElementById("chkShearXY").disabled = true;
  }
  else{
    Szx = -1;
    //document.getElementById("chkShearXY").disabled = false;
  }

  shearChanged = 1;
};

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
//controls.update();

var container = document.getElementById('4');
container.appendChild(renderer.domElement);

//document.body.appendChild( renderer.domElement );

//Create a plane that receives shadows (but does not cast them)
//Create grass

var grassTex = THREE.ImageUtils.loadTexture('img/grass.jpg'); 
grassTex.wrapS = THREE.RepeatWrapping; 
grassTex.wrapT = THREE.RepeatWrapping; 
grassTex.repeat.x = 2; 
grassTex.repeat.y = 3;

var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
//var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x009090, side: THREE.DoubleSide } )
var planeMaterial = new THREE.MeshLambertMaterial( { map: grassTex, side: THREE.DoubleSide } );
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -1.25;

scene.add( plane );


//ROOF
var geometry = new THREE.CylinderGeometry( 0, 1.75, 1, 4 );
var material = new THREE.MeshPhongMaterial( {color: 0xffff00 , wireframe:false, side: THREE.DoubleSide} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.rotation.y = 0.25 * Math.PI;
cylinder.position.y = 1.75;
cylindercastShadow = true;
//scene.add( cylinder );
//end-ROOF

// CUBE setup
var geometry = new THREE.BoxGeometry( 2, 2.5, 2 );

var brickTex = THREE.ImageUtils.loadTexture('img/brick.jpg'); 
brickTex.wrapS = THREE.RepeatWrapping; 
brickTex.wrapT = THREE.RepeatWrapping; 
brickTex.repeat.x = 3; 
brickTex.repeat.y = 3;
var cubeMaterials = [
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/3.jpg'), side: THREE.DoubleSide}), //Right
  new THREE.MeshPhongMaterial({map: brickTex, side: THREE.DoubleSide}), //Left
  new THREE.MeshBasicMaterial({color: 0xF0aa0a, side: THREE.DoubleSide}), //Top
  new THREE.MeshPhongMaterial({color:0xFFFFFF, side: THREE.DoubleSide}), //Bottom
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2.jpg'), side: THREE.DoubleSide}), //Front
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/2.jpg'), side: THREE.DoubleSide}), //Back
  new THREE.MeshPhongMaterial({color:0x555555, side: THREE.DoubleSide}),
  new THREE.MeshPhongMaterial({color:0x00FFFF, side: THREE.DoubleSide}),
  new THREE.MeshPhongMaterial({color:0x00a0FF, side: THREE.DoubleSide}),
  new THREE.MeshPhongMaterial({color:0x4040aF, side: THREE.DoubleSide})
];

//var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh( geometry, cubeMaterials );
cube.castShadow = true;
//end CUBE
//scene.add(cube);

var combined = new THREE.Geometry();
THREE.GeometryUtils.merge( combined, cube );
THREE.GeometryUtils.merge( combined, cylinder );
var mesh = new THREE.Mesh( combined, cubeMaterials );
//Pyramid(Cylinder) roof color
mesh.geometry.faces[12].materialIndex = 6;
mesh.geometry.faces[13].materialIndex = 6;
mesh.geometry.faces[14].materialIndex = 6;
mesh.geometry.faces[15].materialIndex = 6;
mesh.geometry.faces[16].materialIndex = 6;
//console.log(mesh.geometry.faces.length);
//console.log(mesh.geometry);
cube = mesh.clone();
cube.castShadow = true;
scene.add(cube);
//cube.scale.z = 3;
//Light needed for MeshPhongMaterial!!
var light = new THREE.DirectionalLight( 0xffffff, .4 );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

//Lighting stuff
var ambientLight = new THREE.AmbientLight(0x9F9F9F, 0.7);
//ambientLight.castShadow = true; //Ambient light doesn't cast shadows!!
scene.add(ambientLight);

var spotLight;
spotLight = new THREE.SpotLight( 0xffffff, 0.9 );
//spotLight.position.set( 0, 90, 650 );
spotLight.position.set( 100, 10, 200 );
spotLight.castShadow = true;
scene.add( spotLight );

var dirLight1;
dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.4, 800);
dirLight1.target = cube;
dirLight1.castShadow = true;
scene.add(dirLight1);

var dirLight2;
dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.4, 5);
dirLight2.position.set(400, -200, -100);
dirLight2.target = cube;
dirLight2.castShadow = true;

var helper = new THREE.CameraHelper( light.shadow.camera );
//scene.add( helper );

var update = function(){

  if(scaleChanged == 1){
    scaleChanged = 0;
    cube.scale.z = scaleX;
    cube.scale.x = scaleY;
  }

  if(helperStatus == 1){
    scene.add( helper );
  }
  else{
    scene.remove( helper );
  }

  if(shadowStatus == 1){
    plane.receiveShadow = true;
    plane.material.needsUpdate = true;
  }
  else{
    plane.receiveShadow = false;
    plane.material.needsUpdate = true;
  }

  if(cameraTypeChanged == 1){
    if(cameraType == 0){
      camera = new THREE.OrthographicCamera((window.innerWidth/150) / - 2, (window.innerWidth/150) / 2, (window.innerHeight/150) / 2, (window.innerHeight/150) / - 2, .1, 1000 );
      camera.position.set( 60, 10, 15);
    }
    else{
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      camera.position.set( 3.5, 3.5, 2.5);
   }

   camera.aspect = (window.innerWidth/4)/(window.innerHeight/4);
   camera.updateProjectionMatrix();
   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.autoRotate = true;
   cameraTypeChanged = 0;
  }

  if(shearChanged == 1){
    shearChanged = 0;
    scene.remove(cube);
    var matrix = new THREE.Matrix4();

    matrix.set(   1,   Syx,  Szx,  0,
                Sxy,     1,  Szy,  0,
                Sxz,   Syz,   1,   0,
                  0,     0,   0,   1  );

    // apply shear matrix to geometry                  
    cube.geometry.applyMatrix( matrix );
    scene.add(cube);
    Sxy = 0;
    Syz = 0;
    Szx = 0;
  }

if(rotateStatus == 1){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  else{
    cube.rotation.x += 0.0;
    cube.rotation.y += 0.0;
  }

  if(ambLightStatus == 1){
    scene.add(ambientLight);
  }
  else{
    scene.remove(ambientLight);
  }

  if(lightStatus == 1){
    scene.add(dirLight1);
    scene.add(dirLight2);
    dirLight1.position.copy( camera.position );
    //dirLight2.position.copy( camera.position );

    console.log("inside renderer: light status");
  }
  else{
    scene.remove(dirLight1);
    //scene.remove(dirLight2);
  }
  /*
  //Rotate about Z-axis
  if(camera.rotation.z <= 100)
    camera.rotation.z +=0.01;
  else if(camera.rotation.z > 100)
    camera.rotation.z -= 0.01;
*/
if(autoRotateCamera == 1){
  controls.update();}

};

var render = function () {
  requestAnimationFrame( render );
  update();
  renderer.render(scene, camera);
};

var Loop = function(){
  render();
}

Loop();
