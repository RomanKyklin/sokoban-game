import CellTypes from "../cell-types.js";

export class BrownBox {
    constructor() {
    }

    getType() {
        return CellTypes.BROWN_BOX_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/crate_42.png"></td>';
    }
}
