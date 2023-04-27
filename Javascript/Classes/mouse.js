class Mouse {
	constructor() {
        // Screenpos
        this.x = undefined;
        this.y = undefined;

        // Screenpos on starting drag
        this.startDragX = undefined;
        this.startDragY = undefined;

        // World adjusted grid coords
        this.gridX = 0;
        this.gridY = 0;

        // World position on starting drag
        this.worldStartDragX = 0;
        this.worldStartDragY = 0;

        // Current hovered tile on starting drag
        this.startDragTile = undefined;

        this.dragEntity = undefined;
        this.isDragging = false;

        // Amount of drag to disable click
        this.dragDelta = 6;
    }

    startDrag() {
        this.isDragging = true;

        this.startDragX = this.x;
        this.startDragY = this.y;
        this.worldStartDragX = worldX;
        this.worldStartDragY = worldY;
        this.updateGridCoords();
        this.startDragTile = tilemap.tiles[this.gridX][this.gridY];

        this.grabEntity();
    }
    
    endDrag() {
        const diffX = Math.abs(this.x - this.startDragX);
        const diffY = Math.abs(this.y - this.startDragY);

        let tile = tilemap.tiles[this.gridX][this.gridY];
  
        // On click
        if (diffX < this.dragDelta && diffY < this.dragDelta) {
            if (!tile.isSelected) {
                tilemap.deselectAll();
                tile.select();
            }
        }

        this.releaseEntity(tile);

        this.isDragging = false;
    }

    grabEntity() {
        let tile = tilemap.tiles[this.gridX][this.gridY];
        if (tile.isSelected && tile.entity) {
            if (tile.entity instanceof Unit) {
                this.dragEntity = tile.entity;
            }
        }
    }

    releaseEntity(tile) {
        if (this.dragEntity) {
            if (tile.state == TileState.Walkable) {
                tile.assign(this.dragEntity);
            } else {
                this.startDragTile.assign(this.dragEntity);
            }
            this.dragEntity.isDragged = false;
            this.dragEntity = undefined;
        }
    }

    update() {
        this.updateGridCoords();

        if (this.dragEntity != undefined) {
            if (this.dragEntity.tile.isSelected) {
                this.dragEntity.isDragged = true;
                this.dragEntity.dragX = mouse.x - TILESIZE / 2 + worldX;
                this.dragEntity.dragY = mouse.y - TILESIZE / 2 + worldY;
            }
        } else if (this.isDragging) {
            worldX = Math.max(0,this.worldStartDragX + this.startDragX - this.x);
            worldY = Math.max(0,this.worldStartDragY + this.startDragY - this.y);

        }
    };

    draw_hover_tile(colour) {
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.roundRect(this.gridX * TILESIZE - worldX, 
                      this.gridY * TILESIZE - worldY, TILESIZE, TILESIZE, 10);
        ctx.fill();
    }

    draw() {
        this.draw_hover_tile("#c9f3ff66")
    };

    updateGridCoords() {
        this.gridX = Math.floor((this.x + worldX) / TILESIZE);
        this.gridY = Math.floor((this.y + worldY) / TILESIZE);
    }
}