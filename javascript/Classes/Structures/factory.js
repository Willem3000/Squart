class Factory extends Entity {
	constructor() {
		super();
		this.colour = '#fcba03';

		this.draw = function () {
			ctx.fillStyle = this.colour;
			ctx.fillRect(	this.tile.x * TILESIZE, 
							this.tile.y * TILESIZE, 
							TILESIZE,
							TILESIZE);
		};

		this.update = function () {
            
		};
	}
}