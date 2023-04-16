const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILESIZE = 50;
const TileState = {
	Neutral: "#00000000",
	Attackable: "#FF000044",
	Mergable: "#0000FF44",
	Walkable: "#00FF0044"
}
const UnitState = {
	Idle: 0,
	WalkSelect: 1,
	Walking: 2,
	ActionSelect: 3,
	Attacking: 4,
	Merging: 5,
	Fusing: 6,
}

worldX = 0;
worldY = 0;
activeEntity = undefined;

tilemap = new Tilemap(50, 50);
mouse = new Mouse();

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mousedown', function(){
	mouse.startDrag();
});

window.addEventListener('mouseup', function(){
	mouse.endDrag();
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

// Helper functions
function spawn(entity, x, y) {
	tilemap.tiles[x][y].assign(entity);
}

function init(){
	spawn(new Unit("#eb343a"),6,6);
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
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.fillStyle = "#ffebbf";
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	tilemap.draw();
	mouse.draw();
}

init();
draw();