class Unit extends Entity {
	constructor(teamColour) {
		super(teamColour);
		this.selected = false;
		this.color = this.teamColour;
		this.state = UnitState.Idle;
		console.log(this);
	}

	draw() {
		ctx.fillStyle = this.color;
		if (!this.isDragged) {
			ctx.fillRect(	this.tile.x * TILESIZE, 
							this.tile.y * TILESIZE, 
							TILESIZE,
							TILESIZE);
		} else {
			ctx.fillRect(	this.dragX, 
							this.dragY, 
							TILESIZE,
							TILESIZE);
		}
	};

	update() {
		if (this.tile.selected) {
			this.color = '#00FF00';
		} else {
			this.color = this.teamColour
		}
	};
}