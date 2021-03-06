import {Player} from "../cells/bg-table-cells/player.js";
import Box from "../cells/bg-table-cells/box.js";
import {Ground} from "../cells/bg-table-cells/ground.js";
import {BrownBox} from "../cells/bg-table-cells/brown-box.js";
import {Environment} from "../cells/bg-table-cells/environment.js";

export class BgTableRenderer {
    constructor(rootElementSelector) {
        this.rootElementSelector = rootElementSelector;
        this.levels = [
            this.getFirstLevelStructure(),
            this.getSecondLevelStructure()
        ];
        this.currentLevelIndex = 0;
        this.currentLevelStructure = this.getCurrentLevelStructure();
        this.startNewGameBtnId = 'start-new-game';
    }

    getFirstLevelStructure() {
        return [
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
            [
                new Box(),
                new Ground(),
                new Ground(),
                new Player(),
                new Ground(),
                new Box(),
            ],
            [
                new Box(),
                new BrownBox(),
                new Box(),
                new Box(),
                new Box(),
                new Box()
            ],
            [
                new Box(),
                new Ground(),
                new Box()
            ],
            [
                new Box(),
                new Environment(),
                new Box()
            ],
            [
                new Box(),
                new Box(),
                new Box()
            ]
        ]
    };

    getSecondLevelStructure() {
        return [
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
            [
                new Box(),
                new Player(),
                new Ground(),
                new Ground(),
                new Ground(),
                new Box(),
            ],
            [
                new Box(),
                new Ground(),
                new Ground(),
                new BrownBox(),
                new Environment(),
                new Box()
            ],
            [
                new Box(),
                new Ground(),
                new Environment(),
                new BrownBox(),
                new Ground(),
                new Box()
            ],
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
        ]
    }

    getCurrentLevelStructure() {
        return this.levels[this.currentLevelIndex];
    }

    hasNextLevel() {
        return this.levels[this.currentLevelIndex + 1];
    }

    getNextLevel() {
        if (!this.hasNextLevel()) {
            throw new Error('Next level doesnt exists');
        }
        this.currentLevelIndex += 1;
        return this.levels[this.currentLevelIndex];
    }

    renderNextLevel() {
        this.currentLevelStructure = this.getNextLevel();
        this.render();
    }

    changePositions(oldCell, newCell) {
        this.currentLevelStructure = this.currentLevelStructure.map(rowValue => {
            if (rowValue.includes(newCell) || rowValue.includes(oldCell)) {
                return rowValue.map(cellValue => {
                    if (cellValue === oldCell) return newCell;
                    else if (cellValue === newCell) return oldCell;
                    return cellValue;
                });
            }
            return rowValue;
        })
        this.render();
    }

    getCurrentPlayerData() {
        let playerRowIndex;
        let playerCellIndex;
        let player;

        this.currentLevelStructure.forEach((val, index) => {
            if (val.find((val, index) => {
                if (val instanceof Player) {
                    playerCellIndex = index;
                    player = val;
                    return true;
                }
                return false;
            })) {
                playerRowIndex = index;
            }
        });
        return {
            playerCellIndex,
            playerRowIndex,
            player
        }
    }

    getLeftElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.currentLevelStructure[playerRowIndex][playerCellIndex - 1];
    }

    getRightElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.currentLevelStructure[playerRowIndex][playerCellIndex + 1];
    }

    getTopElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.currentLevelStructure[playerRowIndex - 1][playerCellIndex];
    }

    getBottomElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.currentLevelStructure[playerRowIndex + 1][playerCellIndex];
    }

    playerToLeft() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.changePositions(this.getLeftElementFromThePlayer(), player);
    }

    playerToRight() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.changePositions(this.getRightElementFromThePlayer(), player);
    }

    playerToBottom() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.changePositions(this.getBottomElementFromThePlayer(), player);
    }

    playerToTop() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.changePositions(this.getTopElementFromThePlayer(), player);
    }

    saturatePlayer() {}

    unSaturatePlayer() {}

    getHtml() {
        return `<div class="main">
                    <header class="header">
                        <nav class="header__nav">
                            <ul class="header__ul">
                                <li class="header__li" id="${this.startNewGameBtnId}">Начать заново</li>
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

        rootElement.innerHTML = this.getHtml();
    }
}
