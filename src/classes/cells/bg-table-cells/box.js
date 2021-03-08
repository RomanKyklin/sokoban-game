import CellTypes from "../cell-types.js";

export default class Box {
    constructor() {
    }

    getType() {
        return CellTypes.BOX_TYPE;
    }

    getHtml() {
        return '<td class="game__table__td game__table__td--box"></td>';
    }
}
