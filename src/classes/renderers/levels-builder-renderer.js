import {BgTableRenderer} from "./bg-table-renderer.js";
import {CELL_TYPES} from "../cells/cell-types.js";
import {GAME_ENGINE_ACTIONS} from "../mediators/game-mediator.js";

export class LevelsBuilderRenderer extends BgTableRenderer {
    constructor(rootElementSelector, levelsManager, mediator, gamePanelSelector) {
        super(rootElementSelector, levelsManager, mediator);
        this.additionalCellClasses = 'droppable';
        this.gamePanelSelector = gamePanelSelector;
        this.initializeMediatorListeners();
    }

    initializeMediatorListeners() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.rerender_builder, () => this.renderAll());
    }

    get headerTemplate() {
        return `<header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="saveNewLevelTemplate">Сохранить</li>
                            </ul>
                        </nav>
                    </header>`;
    }

    get gamePanelTemplate() {
        return `
            <h2>Панель элементов</h2>
            <div class="game-panel-cells-wrapper">
                <div data-cell-type=${CELL_TYPES.TARGET} class="game-panel-cell ${this.SKIN_MAP[CELL_TYPES.TARGET]}"></div>
                <div data-cell-type=${CELL_TYPES.WALL} class="game-panel-cell ${this.SKIN_MAP[CELL_TYPES.WALL]}"></div>
                <div data-cell-type=${CELL_TYPES.BOX_ON_EMPTY} class="game-panel-cell ${this.SKIN_MAP[CELL_TYPES.BOX_ON_EMPTY]}"></div>
                <div data-cell-type=${CELL_TYPES.EMPTY} class="game-panel-cell ${this.SKIN_MAP[CELL_TYPES.EMPTY]}"></div>
            </div>
        `
    }

    renderGamePanel() {
        document.querySelector(this.gamePanelSelector).innerHTML = this.gamePanelTemplate;
    }

    renderAll() {
        this.render();
        this.renderGamePanel();
    }
}
