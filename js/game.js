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
	WIDTH = 640;
	HEIGHT = 360;
	
	// set some camera attributes
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;
	
	var canvas = document.getElementById("gameCanvas");
	
	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer({ antialias: true });
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
	canvas.appendChild(renderer.domElement);


    // lights:
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(-3, 3, 7);
    dirLight.position.normalize();
    scene.add(dirLight);

    var pointLight = new THREE.PointLight(0xFFFFFF, 5, 50);
    pointLight.position.set(10, 20, -10);
    scene.add(pointLight);

    // create a point light
    pointLight = new THREE.PointLight(0xF8D898);

    // set its position
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;

    // add to the scene
    scene.add(pointLight);



    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load( "models/70m.json", function( geometry ) {
        var dish = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
        scene.add(dish);
    } );


    
    // add the telescopes to the scene
    telescopes = [make_telescope(100, 100, 100), make_telescope(-100, -100, -100), make_telescope(0, 0, 0 )];
    for (tele in telescopes){
    	scene.add(telescopes[tele]);
    }


    draw();
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
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
    
    return ball;
}

function drawInterferenceLine(){
	// draws the neato rect at the bottom of the screen...
	var bar = document.getElementById("interfereBar");
	var ctx=bar.getContext("2d");
	ctx.rect(10,50,50,WIDTH-10);
	ctx.fillStyle="gray";
	ctx.fill();
}
 
function draw()
{
   // draw THREE.JS scene
  renderer.render(scene, camera);


  // process game logic
     for (tele in telescopes){
    	;  // do something?
    }
    
    drawInterferenceLine();

  // loop the draw() function
  requestAnimationFrame(draw);
}
