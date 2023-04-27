class Tile {
	constructor(x, y) {
		this.x = x;
		this.y = y;
        this.entity = undefined;
        this.isSelected = false;
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

        if (this.state != TileState.Neutral) {
            roundRect(this.x * TILESIZE,this.y * TILESIZE, 10, this.state);
        }
    };

    select() {
        this.isSelected = true;
        
        if (this.entity instanceof Unit) {
            this.entity.state = UnitState.WalkSelect;
            this.setWalkTiles();
        }
    };

    deselect() {
        this.isSelected = false;

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
        tilemap.tiles[this.x][this.y].state = TileState.Walkable;
        for (let tile of this.getNeighbours()) {
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
		this.w = w;
		this.h = h;
        this.tiles = undefined;

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
    };
}