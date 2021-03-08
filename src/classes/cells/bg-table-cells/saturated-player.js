import CellTypes from "../cell-types.js";

export class SaturatedPlayer {
    constructor() {
    }

    getType() {
        return CellTypes.SATURATED_PLAYER_TYPE;
    }

    getHtml() {
        return '<td id="default-player-place" class="game__table__td game__table__td--ground game__table__td--player game__table__td--player-default saturate"></td>';
    }
}
