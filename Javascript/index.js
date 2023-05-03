const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CONSTS
const TILESIZE = 50;
const GRIDCOLOUR = "#edd9ad"
const BGCOLOUR = "#ffebbf"
const ISMOBILE = window.navigator.userAgent.match(/Android/i)
				|| window.navigator.userAgent.match(/webOS/i)
				|| window.navigator.userAgent.match(/iPhone/i)
				|| window.navigator.userAgent.match(/iPad/i)
				|| window.navigator.userAgent.match(/iPod/i)
				|| window.navigator.userAgent.match(/BlackBerry/i)
				|| window.navigator.userAgent.match(/Windows Phone/i);

// Enum
const TileState = {
	Neutral: "#00000000",
	Attackable: "#FF000044",
	Mergable: "#0000FF44",
	Walkable: "#00FF0044",
}
const UnitState = {
	Idle: 'Idle',
	WalkSelect: 'WalkSelect',
	Walking: 'Walking',
	HasWalked: 'HasWalked',
	ActionSelect: 'ActionSelect',
	Attacking: 'Attacking',
	Merging: 'Merging',
	Fusing: 'Fusing',
	HasActed: 'HasActed',
}
	
// Global vars
var worldX = 0;
var worldY = 0;
var activeEntity = undefined;

var tilemap = new Tilemap(100, 100);
var mouse = new Mouse();

if (ISMOBILE) {
	window.addEventListener('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
		touch = event.changedTouches[0];
		mouse.x = touch.pageX;
		mouse.y = touch.pageY;
	}, {passive:false});

	window.addEventListener('touchstart', function(event){
		touch = event.changedTouches[0];
		mouse.x = touch.pageX;
		mouse.y = touch.pageY;
		mouse.startDragging();
	});

	window.addEventListener('touchend', function(event){
		mouse.endDragging();
	});
} else {
	window.addEventListener('mousemove',function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	});

	window.addEventListener('mousedown', function(){
		mouse.startDragging();
	});

	window.addEventListener('mouseup', function(){
		mouse.endDragging();
	});
}

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// Helper functions
function spawn(entity, x, y) {
	tilemap.tiles[x][y].assignEntity(entity);
}

function init(){
	spawn(new Unit("#eb343a"),11,5);
	spawn(new Unit("#eb343a"),10,6);
	spawn(new Unit("#343deb"),12,6);
	spawn(new Unit("#343deb"),14,6);
	spawn(new Castle(),10,10);
	spawn(new Castle(),4,10);
}

function update(){
	tilemap.update();
	mouse.update();
}

function draw() {
	requestAnimationFrame(draw);
	update();

	drawBg("#ffebbf");
	tilemap.draw();
	mouse.draw();
	drawText("Testing this epic tool\nTest",5,20, 20);
}

init();
draw();