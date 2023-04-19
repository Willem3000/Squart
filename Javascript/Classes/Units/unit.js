class Unit extends Entity {
	constructor(teamColour) {
		super(teamColour);
		this.colour = this.teamColour;
		this.state = UnitState.Idle;
	}

	draw() {
		if (!this.isDragged) {
			roundRect(this.tile.x * TILESIZE,this.tile.y * TILESIZE,10,this.colour);
		} else {
			roundRect(this.dragX,this.dragY,10,this.colour);
		}
	};

	update() {
		if (this.isSelected) {
			this.colour = '#00FF00';
		} else {
			this.colour = this.teamColour
		}
	};
}