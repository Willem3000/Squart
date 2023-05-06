/** Class handling mouse input. */
class Mouse {
    /**
     * Create a mouse.
     */
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

        this.draggedEntity = undefined;
        this.isDragging = false;

        // Amount of drag to disable click
        this.dragDelta = 6;
    }

    startDragging() {
        this.isDragging = true;

        this.startDragX = this.x;
        this.startDragY = this.y;
        this.worldStartDragX = worldX;
        this.worldStartDragY = worldY;
        this.updateGridCoords();
        this.startDragTile = tilemap.tiles[this.gridX][this.gridY];

        this.grabEntity();
    }
    
    endDragging() {
        const diffX = Math.abs(this.x - this.startDragX);
        const diffY = Math.abs(this.y - this.startDragY);

        let tile = tilemap.tiles[this.gridX][this.gridY];
  
        // On click
        if (diffX < this.dragDelta && diffY < this.dragDelta) {
            tile.select();
        }

        this.releaseEntity(tile);
        this.isDragging = false;
    }

    grabEntity() {
        let tile = this.startDragTile;
        if (tile.entity) {
            if (tile.entity instanceof Unit && tile.entity.getState() == UnitState.WalkSelect) {
                this.draggedEntity = tile.entity;
            }
        }
    }

    releaseEntity(tile) {
        if (this.draggedEntity) {
            tile.select();
            this.draggedEntity.isDragged = false;
            this.draggedEntity = undefined;
        }
    }

    drawHoverTile(colour) {
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.roundRect(this.gridX * TILESIZE - worldX, 
                      this.gridY * TILESIZE - worldY, TILESIZE, TILESIZE, 10);
        ctx.fill();
    }

    updateGridCoords() {
        this.gridX = Math.floor((this.x + worldX) / TILESIZE);
        this.gridY = Math.floor((this.y + worldY) / TILESIZE);
    }

    dragEntity() {
        this.draggedEntity.isDragged = true;
        let xOffset = worldX + this.startDragX - this.startDragTile.x * TILESIZE - TILESIZE / 2;
        let yOffset = worldY + this.startDragY - this.startDragTile.y * TILESIZE - TILESIZE / 2;
        this.draggedEntity.dragX = mouse.x - TILESIZE / 2 + worldX - xOffset;
        this.draggedEntity.dragY = mouse.y - TILESIZE / 2 + worldY - yOffset;
    }

    dragWorld() {
        worldX = Math.max(0,this.worldStartDragX + this.startDragX - this.x);
        worldY = Math.max(0,this.worldStartDragY + this.startDragY - this.y);
    }

    update() {
        this.updateGridCoords();

        if (this.draggedEntity != undefined) {
            this.dragEntity();
        } else if (this.isDragging) {
            this.dragWorld();
        }
    };

    draw() {
        this.drawHoverTile("#c9f3ff66")
    };
}