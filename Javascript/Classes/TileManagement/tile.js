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