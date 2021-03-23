import {BgTableRenderer} from "./bg-table-renderer.js";
import {CELL_TYPES} from "../cells/cell-types.js";
import {GAME_ENGINE_ACTIONS} from "../mediators/game-mediator.js";

export class LevelsBuilderRenderer extends BgTableRenderer {
    constructor(rootElementSelector, levelsManager, mediator, gamePanelSelector) {
        super(rootElementSelector, levelsManager, mediator);
        this.additionalCellClasses = 'droppable';
        this.gamePanelSelector = gamePanelSelector;
        this.saveBtnID = 'saveNewLevelTemplate';
        this.deleteBtnID = 'deleteNewLevelTemplate';
        this.initializeMediatorListeners();
    }

    initializeMediatorListeners() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.rerender_builder, () => this.renderAll());
    }

    initializeDOMListeners() {
        document.querySelector(`#${this.saveBtnID}`).addEventListener('click', () => {
            this.mediator.publish(GAME_ENGINE_ACTIONS.levels_builder_save)
        });
        document.querySelector(`#${this.deleteBtnID}`).addEventListener('click', () => {
            this.mediator.publish(GAME_ENGINE_ACTIONS.levels_builder_delete)
        })
    }

    get headerTemplate() {
        return `<header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="${this.saveBtnID}">Сохранить</li>
                                <li class="header__li" id="${this.deleteBtnID}">Отчистить</li>
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

    get elementSkins() {
        return [
            this.SKIN_MAP[CELL_TYPES.TARGET],
            this.SKIN_MAP[CELL_TYPES.WALL],
            this.SKIN_MAP[CELL_TYPES.BOX_ON_EMPTY],
            this.SKIN_MAP[CELL_TYPES.EMPTY]
        ]
    }

    renderGamePanel() {
        document.querySelector(this.gamePanelSelector).innerHTML = this.gamePanelTemplate;
    }

    renderAll() {
        this.render();
        this.renderGamePanel();
        this.initializeDOMListeners();
    }
}
