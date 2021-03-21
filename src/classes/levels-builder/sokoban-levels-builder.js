import {CELL_TYPES} from "../cells/cell-types.js";


export class SokobanLevelsBuilder {
    constructor(
        renderer
    ) {
        this.renderer = renderer;
    }

    getGamePanelHtml() {
        return `
            <h2>Панель элементов</h2>
            <div class="game-panel-cells-wrapper">
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.TARGET]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.WALL]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.BOX_ON_EMPTY]}"></div>
                <div class="game-panel-cell ${this.renderer.SKIN_MAP[CELL_TYPES.EMPTY]}"></div>
            </div>
        `
    }

    render() {
        const gameHtml = this.renderer.getHtml();
        const gamePanelHtml = this.getGamePanelHtml();
        document.querySelector(this.renderer.rootElementSelector).innerHTML = gameHtml;
        document.querySelector('#game-panel').innerHTML += gamePanelHtml;
    }

    run() {
        this.render();
    }
}
