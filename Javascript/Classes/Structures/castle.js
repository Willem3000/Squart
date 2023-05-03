class Castle extends Entity {
	constructor() {
		super();
		this.colour = '#fcba03';
	}

	draw () {
		roundRect(this.tile.x * TILESIZE, this.tile.y * TILESIZE, 10, this.colour); 
	};

	update () {

	};
}