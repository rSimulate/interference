// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //
// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// game-related variables
var score1 = 0, score2 = 0;
// you can change this to any positive whole number
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;


function setup()
{
	
	// now reset player and opponent scores
	score1 = 0;
	score2 = 0;
	
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



    // set up the sphere vars
    // lower 'segment' and 'ring' values will increase performance
    var radius = 5,
    segments = 6,
    rings = 6;
    
    // create the sphere's material
    var sphereMaterial =
    new THREE.MeshLambertMaterial(
    {
        color: 0xD43001
    });
    
    // Create a ball with sphere geometry
    var ball = new THREE.Mesh(
        new THREE.SphereGeometry(radius,
        segments,
        rings),
        sphereMaterial);
    
    // add the sphere to the scene
    scene.add(ball);
    
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
 
 
function draw()
{
   // draw THREE.JS scene
  renderer.render(scene, camera);


  // process game logic
 
 
  // loop the draw() function
  requestAnimationFrame(draw);
}
