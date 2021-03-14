import CellTypes from "./cells/cell-types.js";

export class PlayingField {
    constructor(cellsFactory) {
        this.cellsFactory = cellsFactory;
    }

    getFirstLevelStructure() {
        return [
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getPlayerInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ]
        ]
    };

    getSecondLevelStructure() {
        return [
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getPlayerInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
        ]
    }

    getAllLevels() {
        return [
            this.getFirstLevelStructure(),
            this.getSecondLevelStructure()
        ]
    }

    isBox(element) {
        return element.getType() === CellTypes.BOX_TYPE;
    }

    isBrownBox(element) {
        return element.getType() === CellTypes.BROWN_BOX_TYPE;
    }

    isEnvironmentBox(element) {
        return element.getType() === CellTypes.ENVIRONMENT_TYPE;
    }

    isGround(element) {
        return element.getType() === CellTypes.GROUND_TYPE;
    }

    isSaturatedBox(element) {
        return element.getType() === CellTypes.SATURATED_BOX_TYPE;
    }

    isPlayerSaturated(player) {
        return player.getType() === CellTypes.SATURATED_PLAYER_TYPE;
    }
}
