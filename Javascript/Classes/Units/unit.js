class Unit extends Entity {
	constructor(teamColour) {
		super(teamColour);
		this.colour = this.teamColour;
		this.state = UnitState.Idle;

		this.stateMachine = {
			unit: undefined,
			state: UnitState.Idle,
			transitions: {
				[UnitState.Idle]: {
					onEnter() {
						
					},
					onExit() {
						
					},
					select() {
						this.unit.setState(UnitState.WalkSelect);
					},
				},
				[UnitState.WalkSelect]: {
					onEnter() {
						this.unit.tile.setActionTiles();
						this.unit.tile.setWalkTiles();
					},
					onExit() {
						tilemap.resetTileStates();
					},
				},
				[UnitState.Walking]: {
					onEnter() {
						this.unit.setState(UnitState.ActionSelect);
					},
					onExit() {
					
					},
				},
				[UnitState.HasWalked]: {
					onEnter() {
						
					},
					onExit() {
					
					},
					select() {
						this.unit.setState(UnitState.ActionSelect);
					},
				},
				[UnitState.ActionSelect]: {
					onEnter() {
						this.unit.tile.setActionTiles();
					},
					onExit() {
						tilemap.resetTileStates();
					},
					select() {
						this.unit.setState(UnitState.HasActed);
					}
				},
				[UnitState.HasActed]: {
					onEnter() {
						
					},
					onExit() {
					
					},
					select() {
						console.log("Has already acted");
					},
				},
			},
			dispatch: function(actionName, parameterList=[]) {
				const action = this.transitions[this.unit.state][actionName]

				if (action) {
					action.apply(this, parameterList);
				} else {
					console.error('ERROR: invalid action ' + this.unit.state + '.' + actionName);
				}
			}
		};
		this.stateMachine['unit'] = this;
	}

	getState() {
		return this.state;
	}

	setState(state) {
		this.stateMachine.dispatch('onExit');
		this.state = state;
		this.stateMachine.dispatch('onEnter');
	};

	select() {
		super.select();
		this.stateMachine.dispatch('select');
	}

	deselect() {
		super.deselect();
		if (this.getState() == UnitState.ActionSelect) {
			this.setState(UnitState.HasWalked);
		} else if (this.getState() == UnitState.WalkSelect) {
			this.setState(UnitState.Idle);
		}

	}

	draw() {
		if (!this.isDragged) {
			roundRect(this.tile.x * TILESIZE,this.tile.y * TILESIZE,10,this.colour);
		} else {
			roundRect(this.dragX,this.dragY,10,this.colour);
		}

		drawText(this.getState(), this.tile.x * TILESIZE - worldX, 
								  this.tile.y * TILESIZE + 10 - worldY, 10);
	};

	update() {
		this.colour = this.teamColour
	};
}