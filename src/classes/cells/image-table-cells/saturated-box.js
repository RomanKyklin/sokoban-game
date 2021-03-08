import CellTypes from "../cell-types.js";

export class SaturatedBox {
    constructor() {
    }

    getType() {
        return CellTypes.SATURATED_BOX_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/ground_05.png"></td>';
    }
}
