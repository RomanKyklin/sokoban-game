import CellTypes from "../cell-types.js";

export class Player {
    constructor() {
    }

    getType() {
        return CellTypes.PLAYER_TYPE;
    }

    getHtml() {
        return '<td id="default-player-place" class="game__table__td game__table__td--ground game__table__td--player game__table__td--player-default"></td>';
    }
}
