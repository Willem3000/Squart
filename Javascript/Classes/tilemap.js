class Tile {
	constructor(x, y) {
		this.x = x;
		this.y = y;
        this.entity = undefined;
        this.selected = false;
    }

    update() {
        if (this.entity) {
            this.entity.update();
        }
    };

    draw() {
        if (this.entity != undefined) {
            this.entity.draw();
        }
    };

    select() {
        this.selected = true;
    };

    deselect() {
        this.selected = false;
    };

    assign(entity) {
        this.entity = entity;

        if (this.entity.tile != undefined) {
            this.entity.tile = undefined;
        }
        this.entity.tile = this;
    }
}

class Tilemap {
	constructor(w, h) {
		this.w = w;
		this.h = h;
        this.tiles = undefined;
		this.bgc = '#000000';

        // Initialize tiles
        this.tiles = new Array(this.w);
        for (let x = 0; x < this.w; x++) {
            this.tiles[x] = new Array(this.h);
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y] = new Tile(x,y);
            }
        }
    }

    update() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].update();
            }
        }
    };

    draw() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].draw();
            }
        }

        for (var x = 0; x <= ctx.width; x += TILESIZE) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for (var y = 0; y <= this.h; y += TILESIZE) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.w, y);
        }
        ctx.stroke();
    };
}