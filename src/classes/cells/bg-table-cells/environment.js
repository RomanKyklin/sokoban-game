import CellTypes from "../cell-types.js";

export class Environment {
    constructor() {
    }

    getType() {
        return CellTypes.ENVIRONMENT_TYPE;
    }

    getHtml() {
        return '<td id="default-environment-place" class="game__table__td game__table__td--environment"></td>';
    }
}
