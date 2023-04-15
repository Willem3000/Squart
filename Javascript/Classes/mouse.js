class Mouse {
	constructor() {
        this.x = undefined,
        this.y = undefined,
        this.gridX = undefined,
        this.gridY = undefined,
        this.click = undefined

        this.update = function () {
            this.gridX = Math.floor((this.x) / TILESIZE)
            this.gridY = Math.floor((this.y) / TILESIZE)

            if (this.click) {
                this.click = false;
            }
		};

        this.draw = function () {
            ctx.fillStyle = "#c9f3ffcc";
			ctx.fillRect(this.gridX * TILESIZE, this.gridY * TILESIZE, TILESIZE, TILESIZE);
        };
	}
}