import {GAME_ENGINE_ACTIONS} from "../mediators/game-mediator.js";
import { CELL_TYPES as CT } from '../cells/cell-types.js';


const iSkin = {
    [CT.EMPTY]: '<td class="game__table__td game__table__td--ground"></td>',
    [CT.WALL]: '<td class="game__table__td game__table__td--box"></td>',
    [CT.TARGET]: '<td id="default-environment-place" class="game__table__td game__table__td--environment"></td>',
    [CT.BOX_ON_EMPTY]: '<td id="default-brown-box-place" class="game__table__td game__table__td--brown-box"></td>',
    [CT.BOX_ON_TARGET]: '<td class="game__table__td game__table__td--green-ground"></td>',
    [CT.PLAYER_ON_EMPTY]: '<td id="default-player-place" class="game__table__td game__table__td--ground game__table__td--player game__table__td--player-default"></td>',
    [CT.PLAYER_ON_TARGET]:'<td id="default-player-place" class="game__table__td game__table__td--ground game__table__td--player game__table__td--player-default saturate"></td>'
}

export class BgTableRenderer {
    constructor(rootElementSelector, levelsManager, mediator) {
        this.rootElementSelector = rootElementSelector;
        this.levelsManager = levelsManager;
        this.mediator = mediator;
        this.initializeMediatorListeners();
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
        console.log(this.currentLevelStructure);
        return;
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
                                                              ${val.map(val => val.getHtml()).join('')}
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
        this.initializeLevelStructure();
        rootElement.innerHTML = this.getHtml();
    }
}
