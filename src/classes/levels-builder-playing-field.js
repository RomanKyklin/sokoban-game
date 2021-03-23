import {PlayingField} from "./playing-field.js";
import {CELL_TYPES} from "./cells/cell-types.js";

export class LevelsBuilderPlayingField extends PlayingField {
    constructor() {
        super();
    }

    levelsBuilderPlayingFieldBluePrint() {
        return [
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.PLAYER_ON_EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.EMPTY, CELL_TYPES.WALL],
            [CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL, CELL_TYPES.WALL],
        ]
    }

    getFirstLevelStructure() {
        return this.levelsBuilderPlayingFieldBluePrint();
    }

    getSecondLevelStructure() {
        return this.levelsBuilderPlayingFieldBluePrint();
    }
}
