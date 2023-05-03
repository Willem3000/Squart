class Tile {
	constructor(x, y) {
		this.x = x;
		this.y = y;
        this.entity = undefined;
        this.state = TileState.Neutral;

        this.stateMachine = {
			self: undefined,
			transitions: {
				[TileState.Neutral]: {
					onEnter() {

					},
					onExit() {
						
					},
                    select() {
                        if (this.self.entity instanceof Unit) {
                            if (activeEntity && activeEntity != this.self.entity) {
                                activeEntity.deselect();
                            }
                            this.self.entity.select();
                        } else {
                            if (activeEntity) {
                                activeEntity.deselect();
                            }
                        }
                    }
				},
				[TileState.Walkable]: {
					onEnter() {
                        this.self.setActive();
						
					},
					onExit() {
						
					},
                    select() {
                        this.self.assignEntity(activeEntity);
						activeEntity.setState(UnitState.Walking);
                    }
				},
				[TileState.Attackable]: {
					onEnter() {
                        this.self.setActive();
						
					},
					onExit() {
						
					},
                    select() {
                        this.self.unassignEntity();
                        activeEntity.setState(UnitState.HasActed);
                    }
				},
				[TileState.Mergable]: {
					onEnter() {
                        this.self.setActive();
						
					},
					onExit() {
						
					}
				},
			},
			dispatch: function(actionName, parameterList=[]) {
				const action = this.transitions[this.self.state][actionName]

				if (action) {
					action.apply(this, parameterList);
				} else {
					console.log('ERROR: ' + action + ' invalid action');
				}
			}
		};
		this.stateMachine['self'] = this;
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

        if (this.state != TileState.Neutral) {
            roundRect(this.x * TILESIZE,this.y * TILESIZE, 10, this.state);
        }
    };

    select() {
        this.stateMachine.dispatch('select');
    };

    deselect() {
        if (this.entity instanceof Unit) {
            this.entity.deselect();
        }
    };

    setActive() {
        tilemap.activeTiles.push(this);
    }

    setState(state) {
        this.stateMachine.dispatch('onExit');
        this.state = state;
        this.stateMachine.dispatch('onEnter');
    }

    resetState() {
        this.stateMachine.dispatch('onExit');
        this.state = TileState.Neutral;
        this.stateMachine.dispatch('onEnter');
    }

    assignEntity(entity) {
        if (entity.tile != undefined) {
            entity.tile.unassignEntity();
        }
        
        entity.tile = this;
        this.entity = entity;
    }

    unassignEntity() {
        this.entity.tile = undefined;
        this.entity = undefined;
    }

    setWalkTiles() {
        tilemap.tiles[this.x][this.y].setState(TileState.Walkable);
        for (let tile of this.getNeighbours()) {
            if (!tile.entity) {
                tile.setState(TileState.Walkable);
            }
        }
    }

    setActionTiles() {
        for (let tile of this.getNeighbours()) {
            if (tile.entity) {
                if (tile.entity.teamColour == activeEntity.teamColour) {
                    tile.setState(TileState.Mergable);
                } else {
                    tile.setState(TileState.Attackable);
                }
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