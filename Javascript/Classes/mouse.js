class Mouse {
	constructor() {
        this.x = undefined;
        this.y = undefined;
        this.gridX = undefined;
        this.gridY = undefined;

        this.startDragX = undefined;
        this.startDragY = undefined;
        this.startDragTile = undefined;
        this.isDragging = false;
        this.dragEntity = undefined;
        this.dragDelta = 6;
    }

    startDrag() {
        this.startDragX = this.x;
        this.startDragY = this.y;
        this.startDragTile = tilemap.tiles[this.gridX][this.gridY]

        this.grabEntity();
    }
    
    endDrag() {
        const diffX = Math.abs(this.x - this.startDragX);
        const diffY = Math.abs(this.y - this.startDragY);

        let tile = tilemap.tiles[mouse.gridX][mouse.gridY];
  
        // On click
        if (diffX < this.dragDelta && diffY < this.dragDelta) {
            if (!tile.selected) {
                tilemap.deselectAll();
                tile.select();
            }
        }

        this.releaseEntity(tile);
    }

    grabEntity() {
        let tile = tilemap.tiles[mouse.gridX][mouse.gridY];
        if (tile.selected && tile.entity) {
            if (tile.entity instanceof Unit) {
                this.dragEntity = tile.entity;
            }
        }
    }

    releaseEntity(tile) {
        if (this.dragEntity) {
            if (tile.entity == undefined && tile.state == TileState.Walkable) {
                tile.assign(this.dragEntity);
            } else {
                this.startDragTile.assign(this.dragEntity);
            }
            this.dragEntity.isDragged = false;
            this.dragEntity = undefined;
        }
    }

    update() {
        this.gridX = Math.floor((this.x) / TILESIZE)
        this.gridY = Math.floor((this.y) / TILESIZE)

        if (this.dragEntity != undefined) {
            if (this.dragEntity.tile.selected) {
                this.dragEntity.isDragged = true;
                this.dragEntity.dragX = mouse.x - TILESIZE / 2;
                this.dragEntity.dragY = mouse.y - TILESIZE / 2;
            }
        }
    };

    draw() {
        ctx.fillStyle = "#c9f3ff66";
        ctx.fillRect(this.gridX * TILESIZE, this.gridY * TILESIZE, TILESIZE, TILESIZE);
    };
}