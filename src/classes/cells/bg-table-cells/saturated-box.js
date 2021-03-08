import CellTypes from "../cell-types.js";

export class SaturatedBox {
    constructor() {
    }

    getType() {
        return CellTypes.SATURATED_BOX_TYPE;
    }

    getHtml() {
        return '<td class="game__table__td game__table__td--green-ground"></td>';
    }
}
