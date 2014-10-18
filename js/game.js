// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //
// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// game-related variables
var score = 0;

// (0 - easiest, 1 - hardest)
var difficulty = 0.2;


function setup()
{
	// now reset player score
	score = 0;

	// set up all the 3D objects in the scene	
	createScene();
	
	// and let's get cracking!
	draw();
}


function createScene()
{
	// set the scene size
	var WIDTH = 640,
	  HEIGHT = 360;
	
	// set some camera attributes
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;
	
	var c = document.getElementById("gameCanvas");
	
	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
	
	scene = new THREE.Scene();
	
	// add the camera to the scene
	scene.add(camera);
	
	// set a default position for the camera
	// not doing this somehow messes up shadow rendering
	camera.position.z = 320;
	
	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);
	
	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);


    
    // add the telescopes to the scene
    scene.add(make_telescope(100, 100, 100));
    scene.add(make_telescope(-100, -100, -100));
    scene.add(make_telescope(0, 0, 0 ));
    
    
    // // create a point light
    pointLight = new THREE.PointLight(0xF8D898);
    
    // set its position
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    
    // add to the scene
    scene.add(pointLight);

    draw();
}
 
function make_telescope(x, y, z){
    // set up the telescope mesh vars (currently a sphere)
    // lower 'segment' and 'ring' values will increase performance
    var radius = 10,
    segments = 6,
    rings = 6;
    
    // create the telescope's material
    var sphereMaterial =
    new THREE.MeshLambertMaterial(
    {
        color: 0xD43001
    });
    
    // Create a telescope
    var ball = new THREE.Mesh(
        new THREE.SphereGeometry(radius,
        segments,
        rings),
        sphereMaterial);
    
    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;
}
 
function draw()
{
   // draw THREE.JS scene
  renderer.render(scene, camera);


  // process game logic
 
 
  // loop the draw() function
  requestAnimationFrame(draw);
}
