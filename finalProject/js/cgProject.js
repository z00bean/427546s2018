
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

var renderer = new THREE.WebGLRenderer({antialias:true});

var rotateStatus = 0;
var ambLightStatus = 0;
var lightStatus = 0;

// renderer clear color
renderer.setClearColor("#000000");

renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
});

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

controls = new THREE.OrbitControls(camera, renderer.domElement);

document.body.appendChild( renderer.domElement );

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

cube.rotation.x += 0;
cube.rotation.y += .8;
cube.rotation.z += .7;

scene.add( cube );

//Lighting stuff
var ambientLight = new THREE.AmbientLight(0x9F9F9F, 0.7);
//scene.add(ambientLight);

var spotLight;
spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 90, 650 );
scene.add( spotLight );

var dirLight1;
dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.4, 800);
dirLight1.target = cube;
//scene.add(dirLight1);

var dirLight3;
dirLight3 = new THREE.DirectionalLight(0xFFFFFF, 0.4, 5);
dirLight3.position.set(400, -200, -100);
dirLight3.target = cube;

var update = function(){
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
    scene.add(dirLight3);
    dirLight1.position.copy( camera.position );
    dirLight3.position.copy( camera.position );

    console.log("inside renderer: light status");
  }
  else{
    scene.remove(dirLight1);
    scene.remove(dirLight3);
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