class Unit extends Entity {
	constructor() {
		super();
		this.selected = false;
		this.color = '#000000';

		this.draw = function () {
			ctx.fillStyle = this.color;
			ctx.fillRect(	this.tile.x * TILESIZE, 
							this.tile.y * TILESIZE, 
							TILESIZE,
							TILESIZE);
		};

		this.update = function () {
			if (this.selected) {
				this.color = '#00FF00';
				if (mouse.click) {
					this.selected = false;
					mouse.click = false;
					this.tile.entity = undefined;
					tilemap.tiles[mouse.gridX][mouse.gridY].assign(this);
				}
			} else {
				if (mouse.gridX == this.tile.x && mouse.gridY == this.tile.y) {
					this.color = '#FF0000';
					if (mouse.click) {
						this.selected = true;
					}
				} else {
					this.color = '#000000'
				}
			}
		};
	}
}