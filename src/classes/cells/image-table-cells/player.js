import CellTypes from "../cell-types.js";

export class Player {
    constructor() {
    }

    getType() {
        return CellTypes.PLAYER_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/player_23.png"></td>';
    }
}
