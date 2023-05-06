class Entity {
    constructor(teamColour) {
        this.isDragged = false;
        this.dragX = 0;
        this.dragY = 0;
        this.tile = undefined;
        this.teamColour = teamColour
    }

    select() {
        activeEntity = this;
    }

    deselect() {
        activeEntity = undefined;
    }
}