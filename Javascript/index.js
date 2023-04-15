const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILESIZE = 50;

tilemap = new Tilemap(50, 50);
mouse = new Mouse();

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('click', function(){
    mouse.click = true;
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
	spawn(new Unit(),18,18);
	spawn(new Castle(),10,10);
}

function update(){
	tilemap.update();
	mouse.update();
}

function draw() {
	requestAnimationFrame(draw);
	update();
	ctx.clearRect(0,0,innerWidth,innerHeight);
	tilemap.draw();
	mouse.draw();
}

init();
draw();