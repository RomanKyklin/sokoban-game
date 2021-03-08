import CellTypes from "../cell-types.js";

export class BrownBox {
    constructor() {
    }

    getType() {
        return CellTypes.BROWN_BOX_TYPE;
    }

    getHtml() {
        return '<td id="default-brown-box-place" class="game__table__td game__table__td--brown-box"></td>';
    }
}
