class Tile {
	constructor(x, y) {
		this.x = x;
		this.y = y;
        this.entity = undefined;
        this.selected = false;
        this.state = TileState.Neutral;
    }

    update() {
        if (this.entity) {
            this.entity.update();
        }

        switch(this.state) {
            case TileState.Neutral:
                break;
            case TileState.Attackable:
                break;
            case TileState.Mergable:
                break;
        }
    };

    draw() {
        if (this.entity != undefined) {
            this.entity.draw();
        }

        ctx.fillStyle = this.state;
        ctx.fillRect(	this.x * TILESIZE, 
                        this.y * TILESIZE, 
                        TILESIZE,
                        TILESIZE);
    };

    select() {
        this.selected = true;
        
        if (this.entity instanceof Unit) {
            this.entity.state = UnitState.WalkSelect;
            this.setWalkTiles();
        }
    };

    deselect() {
        this.selected = false;

        if (this.entity instanceof Unit) {
            this.entity.state = UnitState.Idle;
        }
        tilemap.resetTileStates();
    };

    assign(entity) {

        if (entity.tile != undefined) {
            entity.tile.unassign();
        }
        
        entity.tile = this;
        this.entity = entity;
    }

    unassign() {
        this.entity.tile = undefined;
        this.entity = undefined;
        tilemap.resetTileStates();
    }

    setWalkTiles() {
        for (let tile of this.getNeighbours()) {
            console.log(this.getNeighbours());
            if (!tile.entity) {
                tile.state = TileState.Walkable;
            }
        }
    }

    getNeighbours() {
        return [tilemap.tiles[this.x][this.y-1],
                tilemap.tiles[this.x+1][this.y],
                tilemap.tiles[this.x][this.y+1],
                tilemap.tiles[this.x-1][this.y]];
    }
}

class Tilemap {
	constructor(w, h) {
        this.x = 0;
        this.y = 0;
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

    deselectAll() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].deselect();
            }
        }
    }

    resetTileStates() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y].state = TileState.Neutral;
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

        /*for (var x = 0; x <= ctx.width; x += TILESIZE) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for (var y = 0; y <= this.h; y += TILESIZE) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.w, y);
        }
        ctx.stroke();*/
    };
}