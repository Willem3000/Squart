class Tilemap {
	constructor(w, h) {
		this.w = w;
		this.h = h;
        this.tiles = [];
        this.activeTiles = [];

        // Initialize tiles
        this.tiles = new Array(this.w);
        for (let x = 0; x < this.w; x++) {
            this.tiles[x] = new Array(this.h);
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y] = new Tile(x,y);
            }
        }
    }

    deselectAll() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].deselect();
            }
        }
    }

    resetTileStates() {
        for (let tile of this.activeTiles) {
            tile.resetState();
        }
        this.activeTiles = [];
    }

    update() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].update();
            }
        }
    };

    drawGrid() {
        ctx.strokeStyle = GRIDCOLOUR;
        for (var x = 0; x <= this.w; x++) {
            ctx.moveTo(x * TILESIZE - worldX, 0);
            ctx.lineTo(x * TILESIZE - worldX, this.h * TILESIZE);
        }
        for (var y = 0; y <= this.h; y++) {
            ctx.moveTo(0, y * TILESIZE - worldY);
            ctx.lineTo(this.w * TILESIZE, y * TILESIZE - worldY);
        }
        ctx.stroke();
    }

    draw() {
        this.drawGrid();

        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].draw();
            }
        }
    };
}