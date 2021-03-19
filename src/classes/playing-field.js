import CellTypes from "./cells/cell-types.js";
import {CELL_TYPES} from "./cells/cell-types.js";

export class PlayingField {
    constructor(cellsFactory) {
        this.cellsFactory = cellsFactory;
    }

    getFirstLevelStructure() {
        return [
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.PLAYER_ON_EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.BOX_ON_EMPTY, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.TARGET, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
        ]
    };

    getSecondLevelStructure() {
        return [
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.PLAYER_ON_EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.BOX_ON_EMPTY, CELL_TYPES.TARGET, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.BOX_ON_EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.TARGET, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
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
