import CellTypes from "../cell-types.js";

export class Environment {
    constructor() {
    }

    getType() {
        return CellTypes.ENVIRONMENT_TYPE;
    }

    getHtml() {
        return '<td><img src="./assets/environment_10.png"></td>';
    }
}
