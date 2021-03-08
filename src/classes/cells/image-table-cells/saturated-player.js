import CellTypes from "../cell-types.js";

export class SaturatedPlayer {
    constructor() {
    }

    getType() {
        return CellTypes.SATURATED_PLAYER_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/player_23.png" class="saturate"></td>';
    }
}
