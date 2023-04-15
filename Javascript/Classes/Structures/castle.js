class Castle extends Entity {
	constructor() {
		super();
		this.selected = false;
		this.color = '#fcba03';

		this.draw = function () {
			ctx.fillStyle = this.color;
			ctx.fillRect(	this.tile.x * TILESIZE, 
							this.tile.y * TILESIZE, 
							TILESIZE,
							TILESIZE);
		};
		this.update = function () {

		};
	}
}