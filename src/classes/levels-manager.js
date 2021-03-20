import {CELL_TYPES} from "./cells/cell-types.js";

export class LevelsManager {
    constructor(startLevelIndex = 0, levelsStructure = []) {
        this.levelsStructure = levelsStructure;
        this.startLevelIndex = startLevelIndex;
        this.currentLevelIndex = startLevelIndex;
        this.currentLevelStructure = this.getCurrentLevel();
        this.playerPosition = {};
    }

    getCurrentLevel() {
        return this.levelsStructure[this.currentLevelIndex];
    }

    getCurrentLevelStructure() {
        return this.currentLevelStructure;
    }

    hasNextLevel() {
        return this.levelsStructure[this.currentLevelIndex + 1] != undefined;
    }

    findPlayerPosition() {
        this.currentLevelStructure.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell & CELL_TYPES.PLAYER) {
                    this.playerPosition = {x, y};
                }
            })
        })
        return this.playerPosition;
    }

    toRight() {
        this.findPlayerPosition();
        console.log(this.playerPosition)
    }

    toLeft() {

    }

    toTop() {

    }

    toBottom() {

    }

    getNextLevel() {
        if (!this.hasNextLevel()) {
            throw new Error('Next level doesnt exists');
        }
        this.currentLevelIndex += 1;
        this.currentLevelStructure = this.getCurrentLevel();
        return this.levelsStructure[this.currentLevelIndex];
    }
}
