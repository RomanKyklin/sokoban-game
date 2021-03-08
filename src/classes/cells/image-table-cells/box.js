import CellTypes from "../cell-types.js";

export default class Box {
    constructor() {
    }

    getType() {
        return CellTypes.BOX_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/crate_11.png"></td>';
    }
}
