class Entity {
    constructor(teamColour) {
        this.isDragged = false;
        this.isSelected = false;
        this.dragX = 0;
        this.dragY = 0;
        this.tile = undefined;
        this.teamColour = teamColour
    }
}