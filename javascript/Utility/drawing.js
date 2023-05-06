function roundRect(x,y,round,colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.roundRect(	x - worldX, 
                    y - worldY, 
                    TILESIZE,
                    TILESIZE, round);
    ctx.fill();
}

function drawBg(colour) {
    ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.fillStyle = colour;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
}

function drawText(text,x=0,y=0,font_size=14,font="Arial",colour="#000000") {
    ctx.fillStyle = colour;
    ctx.font = font_size.toString() + "px " + font;

    var lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * font_size);
    }
}