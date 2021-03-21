import {GAME_ENGINE_ACTIONS} from "../mediators/game-mediator.js";
import {CELL_TYPES as CT} from '../cells/cell-types.js';


export class BgTableRenderer {
    SKIN_MAP = {
        [CT.EMPTY]: 'game__table__td game__table__td--ground',
        [CT.WALL]: 'game__table__td game__table__td--box',
        [CT.TARGET]: 'game__table__td game__table__td--environment',
        [CT.BOX_ON_EMPTY]: 'game__table__td game__table__td--brown-box',
        [CT.BOX_ON_TARGET]: 'game__table__td game__table__td--green-ground',
        [CT.PLAYER_ON_EMPTY]: 'game__table__td game__table__td--ground game__table__td--player game__table__td--player-default',
        [CT.PLAYER_ON_TARGET]: 'game__table__td game__table__td--ground game__table__td--player game__table__td--player-default saturate'
    }

    constructor(rootElementSelector, levelsManager, mediator) {
        this.rootElementSelector = rootElementSelector;
        this.levelsManager = levelsManager;
        this.mediator = mediator;
        this.additionalCellClasses = '';
        this.initializeMediatorListeners();
        this.initializeLevelStructure();
    }

    setAdditionalCellClasses(...classes) {
        this.additionalCellClasses = classes.join(' ');
    }

    initializeLevelStructure() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevelStructure();
    }

    initializeMediatorListeners() {
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.rerender_game, this.render.bind(this));
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.start_new_game, this.restartLevel.bind(this));
        this.mediator.subscribe(GAME_ENGINE_ACTIONS.to_the_next_level, this.renderNextLevel.bind(this));
    }

    restartLevel() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevel();
        this.render();
    }

    renderNextLevel() {
        this.currentLevelStructure = this.levelsManager.getNextLevel();
        this.render();
    }

    getHtml() {
        return `<div class="main">
                    <header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="startNewGameBtnId">Начать заново</li>
                            </ul>
                        </nav>
                    </header>
        
                <section class="game">
                    <table class="game__table">
                    ${this.currentLevelStructure.map(val => {
            return `<tr class="game__table__tr">
                      ${val.map(val => `<td class="${this.SKIN_MAP[val]} ${this.additionalCellClasses}"></td>`).join('')}
                                        </tr>`
        }).join('')}
                    </table>
                </section>
        </div>`
    }

    render() {
        const rootElement = document.querySelector(`${this.rootElementSelector}`);

        if (!rootElement) {
            throw new Error('root element was not found!');
        }
        rootElement.innerHTML = this.getHtml();
    }
}
