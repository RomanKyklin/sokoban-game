import CellTypes from "../cell-types.js";

export class Ground {
    constructor() {
    }

    getType() {
        return CellTypes.GROUND_TYPE;
    }

    getHtml() {
        return '<td class="game__table__td game__table__td--ground"></td>'
    }
}
