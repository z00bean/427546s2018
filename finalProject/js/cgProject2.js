
var scene = new THREE.Scene();
var camera;
//camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera = new THREE.OrthographicCamera((window.innerWidth/150) / - 2 , (window.innerWidth/150) / 2, (window.innerHeight/150) / 2, (window.innerHeight/150) / - 2, .1, 1200 );
//camera.position.z = 4;
//camera.position.set( 90, 75, 100);
camera.position.set( 60, 10, 15);
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
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

window.addEventListener('resize', function(){
  //var width = document.getElementById('4').style.width;
  //var height = document.getElementById('4').style.height;
  var width = window.innerWidth;
  var height = window.innerHeight;
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
controls.autoRotate = true;

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
var planeMaterial = new THREE.MeshLambertMaterial( { map: grassTex, side: THREE.DoubleSide } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
//plane.rotation.x = -0.5 * Math.PI;
//plane.position.z = -2.5;
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

// cube setup
var geometry = new THREE.BoxGeometry( 2, 2.5, 2 );
/*
var cubeMaterials = [
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/3.jpg'), side: THREE.DoubleSide}), //Right
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/2.jpg'), side: THREE.DoubleSide}), //Left
  new THREE.MeshBasicMaterial({color:0xF08F81, side: THREE.DoubleSide}), //Top
  new THREE.MeshPhongMaterial({color:0x433F81, side: THREE.DoubleSide}), //Bottom
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'), side: THREE.DoubleSide}), //Front
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/3.jpg'), side: THREE.DoubleSide}) //Back
];
*/
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
  new THREE.MeshPhongMaterial({color:0x555555, side: THREE.DoubleSide}),
  new THREE.MeshPhongMaterial({color:0x555555, side: THREE.DoubleSide}),
  new THREE.MeshPhongMaterial({color:0x555555, side: THREE.DoubleSide})
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
mesh.geometry.faces[12].materialIndex = 6;
mesh.geometry.faces[13].materialIndex = 6;
mesh.geometry.faces[14].materialIndex = 6;
mesh.geometry.faces[15].materialIndex = 6;
mesh.geometry.faces[16].materialIndex = 6;
mesh.geometry.faces[17].materialIndex = 6;
mesh.geometry.faces[18].materialIndex = 6;
mesh.geometry.faces[19].materialIndex = 6;
//console.log(mesh.geometry.faces.length);
//console.log(mesh.geometry);
cube = mesh.clone();
cube.castShadow = true;
scene.add(cube);
//cube.scale.z = 2;

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
        camera.position.set( 5, 4.5, 3.5);
     }
     camera.aspect = (window.innerWidth/4)/(window.innerHeight/4);
     camera.updateProjectionMatrix();
     controls = new THREE.OrbitControls(camera, renderer.domElement);
     controls.autoRotate = true;
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
