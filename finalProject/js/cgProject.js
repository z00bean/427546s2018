//Front
var c1=document.getElementById("canvas1");
var ctx1=c1.getContext("2d");
var img1 = new Image();
ctx1.font = "11px Arial";
ctx1.fillText("Front view",10,10);
img1.onload = function() {

  ctx1.drawImage(img1, 40, 40, 50, 75);

};
img1.src = '../img/1.jpg';

//Side
var c2=document.getElementById("canvas2");
var ctx2=c2.getContext("2d");
ctx2.font = "11px Arial";
ctx2.fillText("Side view",10,10);
var img2 = new Image();
img2.onload = function() {

  ctx2.drawImage(img2, 40, 40, 50, 75);

};
img2.src = '../img/2.jpg';

//Top
var c3=document.getElementById("canvas3");
var ctx3=c3.getContext("2d");
ctx3.font = "11px Arial";
ctx3.fillText("Top view",10,10);
var img3 = new Image();
img3.onload = function() {

  ctx3.drawImage(img3, 40, 20);

};
img3.src = '../img/top.png';

//end side, top views

var scene = new THREE.Scene();
var camera;
//camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera = new THREE.OrthographicCamera((window.innerWidth/150) / - 2, (window.innerWidth/150) / 2, (window.innerHeight/150) / 2, (window.innerHeight/150) / - 2, .1, 700 );
camera.position.z = 4;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.shadowMapType = THREE.PCFShadowMap; 
/*
renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;
renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;
*/

var rotateStatus = 0;
var ambLightStatus = 1;
var lightStatus = 0;
var cameraTypeChanged = 0;
var cameraType = 0; //0 for otho, 1 for perspective
var shearXY = 0;
var shearYZ = 0;
var shearZX = 0;
var shearChanged = 0;
var shadowStatus = 0;
var helperStatus = 1;

//SHEAR variables
var Syx = 0,
    Szx = 0,
    Sxy = 0,
    Szy = 0,
    Sxz = 0,
    Syz = 0;

// renderer clear color
renderer.setClearColor("#b0b0b0");
//renderer.setSize( document.getElementById('4').style.width, document.getElementById('4').style.height );
renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
renderer.shadowMap.enabled = true;

window.addEventListener('resize', function(){
  //var width = document.getElementById('4').style.width;
  //var height = document.getElementById('4').style.height;
  var width = window.innerWidth/4;
  var height = window.innerHeight/4;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
});

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
  if(document.getElementById("chkShearXY").checked == true)
    Sxy = 1;
  else
    Sxy = -1;

  shearChanged = 1;
};
function setShearStatusYZ(){
  if(document.getElementById("chkShearYZ").checked == true)
    Syz = 1;
  else
    Syz = -1;

  shearChanged = 1;
};
function setShearStatusZX(){
  if(document.getElementById("chkShearZX").checked == true)
    Szx = 1;
  else
    Szx = -1;

  shearChanged = 1;
};

controls = new THREE.OrbitControls(camera, renderer.domElement);

var container = document.getElementById('4');
container.appendChild(renderer.domElement);

//document.body.appendChild( renderer.domElement );


//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x009090, side: THREE.DoubleSide } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
//plane.rotation.x = -0.5 * Math.PI;
plane.position.z = -2.5;

scene.add( plane );



// cube setup
var geometry = new THREE.BoxGeometry( 2, 2.5, 2 );

var cubeMaterials = [
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/3.jpg'), side: THREE.DoubleSide}), //Right
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/2.jpg'), side: THREE.DoubleSide}), //Left
  new THREE.MeshBasicMaterial({color:0xF08F81, side: THREE.DoubleSide}), //Top
  new THREE.MeshPhongMaterial({color:0x433F81, side: THREE.DoubleSide}), //Bottom
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.DoubleSide}), //Front
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/3.jpg'), side: THREE.DoubleSide}) //Back
];


//Light needed for MeshPhongMaterial!!
var light = new THREE.DirectionalLight( 0xffffff, .4 );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

//var material = new THREE.MeshBasicMaterial( { color: "#433F81", wireframe:false } );
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh( geometry, material );

cube.castShadow = true;

cube.rotation.x += 0;
cube.rotation.y += .8;
cube.rotation.z += .7;
scene.add( cube );


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
      if(cameraType == 0)
        camera = new THREE.OrthographicCamera((window.innerWidth/150) / - 2, (window.innerWidth/150) / 2, (window.innerHeight/150) / 2, (window.innerHeight/150) / - 2, .1, 1000 );
     else
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 4;
     camera.aspect = (window.innerWidth/4)/(window.innerHeight/4);
     camera.updateProjectionMatrix();
     controls = new THREE.OrbitControls(camera, renderer.domElement);
     cameraTypeChanged = 0;
  }

  if(shearChanged == 1){
    shearChanged = 0;
    scene.remove( cube );
    var matrix = new THREE.Matrix4();

    matrix.set(   1,   Syx,  Szx,  0,
                Sxy,     1,  Szy,  0,
                Sxz,   Syz,   1,   0,
                  0,     0,   0,   1  );

    // apply shear matrix to geometry                  
    cube.geometry.applyMatrix( matrix );
    scene.add( cube );
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
