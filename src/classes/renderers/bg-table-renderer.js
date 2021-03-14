import {Player} from "../cells/bg-table-cells/player.js";
import {Ground} from "../cells/bg-table-cells/ground.js";
import {BrownBox} from "../cells/bg-table-cells/brown-box.js";
import {Environment} from "../cells/bg-table-cells/environment.js";
import {SaturatedBox} from "../cells/bg-table-cells/saturated-box.js";
import {SaturatedPlayer} from "../cells/bg-table-cells/saturated-player.js";
import CellTypes from "../cells/cell-types.js";

export class BgTableRenderer {
    constructor(rootElementSelector, playingField, levelsManager) {
        this.rootElementSelector = rootElementSelector;
        this.playingField = playingField;
        this.levelsManager = levelsManager;
        this.initializeDefaultData();
    }

    initializeDefaultData() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevel();
        this.startNewGameBtnId = 'start-new-game';
        this.previousPlayerPosition = null;
        this.currentEnvironmentPosition = null;
    }

    getPreviousPlayerPosition() {
        return this.previousPlayerPosition;
    }

    setPreviousPlayerPosition(playerRowIndex, playerCellIndex) {
        this.previousPlayerPosition = {
            playerRowIndex,
            playerCellIndex
        }
    }

    getCurrentEnvironmentPosition() {
        return this.currentEnvironmentPosition;
    }

    setCurrentEnvironmentPosition(rowIndex, cellIndex) {
        this.currentEnvironmentPosition = {
            rowIndex,
            cellIndex
        }
    }

    restartLevel() {
        this.currentLevelStructure = this.levelsManager.getCurrentLevel();
        this.render();
    }

    renderNextLevel() {
        this.currentLevelStructure = this.levelsManager.getNextLevel();
        this.render();
    }

    getNewGameBtn() {
        return document.querySelector(`#${this.startNewGameBtnId}`);
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
        let playerType;

        this.currentLevelStructure.forEach((val, index) => {
            if (val.find((val, index) => {
                playerType = val.getType();
                if (playerType === CellTypes.PLAYER_TYPE || playerType === CellTypes.SATURATED_PLAYER_TYPE) {
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

    getElementFullData(element) {
        let rowIndex;
        let cellIndex;

        this.currentLevelStructure.forEach((val, index) => {
            if (val.find((val, index) => {
                if (val === element) {
                    cellIndex = index;
                    return true;
                }
                return false;
            })) {
                rowIndex = index;
            }
        });
        return {
            rowIndex,
            cellIndex,
            element
        }
    }

    getElement(rowIndex, cellIndex) {
        return this.currentLevelStructure[rowIndex][cellIndex];
    }

    getLeftElementFrom(rowIndex, cellIndex) {
        return this.currentLevelStructure[rowIndex][cellIndex - 1];
    }

    getRightElementFrom(rowIndex, cellIndex) {
        return this.currentLevelStructure[rowIndex][cellIndex + 1];
    }

    getTopElementFrom(rowIndex, cellIndex) {
        return this.currentLevelStructure[rowIndex - 1][cellIndex];
    }

    getBottomElementFrom(rowIndex, cellIndex) {
        return this.currentLevelStructure[rowIndex + 1][cellIndex];
    }

    getLeftElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.getLeftElementFrom(playerRowIndex, playerCellIndex);
    }

    getRightElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.getRightElementFrom(playerRowIndex, playerCellIndex);
    }

    getTopElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.getTopElementFrom(playerRowIndex, playerCellIndex);
    }

    getBottomElementFromThePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        return this.getBottomElementFrom(playerRowIndex, playerCellIndex);
    }

    playerToLeft() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.setPreviousPlayerPosition(playerRowIndex, playerCellIndex);
        this.changePositions(this.getLeftElementFromThePlayer(), player);
    }

    playerToRight() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.setPreviousPlayerPosition(playerRowIndex, playerCellIndex);
        this.changePositions(this.getRightElementFromThePlayer(), player);
    }

    playerToBottom() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.setPreviousPlayerPosition(playerRowIndex, playerCellIndex);
        this.changePositions(this.getBottomElementFromThePlayer(), player);
    }

    playerToTop() {
        const {player, playerCellIndex, playerRowIndex} = this.getCurrentPlayerData();
        this.setPreviousPlayerPosition(playerRowIndex, playerCellIndex);
        this.changePositions(this.getTopElementFromThePlayer(), player);
    }

    changeElementTo(currentElement, to) {
        this.currentLevelStructure = this.currentLevelStructure.map(rowArray => {
            if (rowArray.includes(currentElement)) return rowArray.map(cell => cell === currentElement ? to : cell);
            return rowArray;
        });
        this.render();
    }

    saturateBox(boxElement) {
        this.changeElementTo(boxElement, new SaturatedBox());
    }

    unSaturateBox(boxElement) {
        this.changeElementTo(boxElement, new BrownBox());
    }

    saturatedBoxAndReturnNewElement(boxElement) {
        const newElement = new SaturatedBox();
        this.changeElementTo(boxElement, newElement);
        return newElement;
    }

    unSaturateBoxAndReturnNewElement(boxElement) {
        const newElement = new BrownBox()
        this.changeElementTo(boxElement, newElement);

        return newElement;
    }

    changeElementToGround(element) {
        this.changeElementTo(element, new Ground());
    }

    changeElementToEnvironment(element) {
        this.changeElementTo(element, new Environment());
    }

    saturatePlayer() {
        const {player, playerRowIndex, playerCellIndex} = this.getCurrentPlayerData();
        this.setCurrentEnvironmentPosition(playerRowIndex, playerCellIndex);
        this.changeElementTo(player, new SaturatedPlayer())
    }

    unSaturatePlayer() {
        this.changeElementTo(this.getCurrentPlayerData().player, new Player())
    }

    unSaturatePlayerActions({rowIndex, cellIndex}) {
        setTimeout(() => {
            this.unSaturatePlayer();
            this.changeElementToEnvironment(this.getElement(rowIndex, cellIndex))
        }, 0);
    }

    unSaturateBoxActions({rowIndex, cellIndex, element}) {
        setTimeout(() => {
            this.unSaturateBox(element);
            this.saturatePlayer();
        }, 0);
    }

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
