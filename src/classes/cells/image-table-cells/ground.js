import CellTypes from "../cell-types.js";

export class Ground {
    constructor() {
    }

    getType() {
        return CellTypes.GROUND_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/ground_06.png"></td>';
    }
}
