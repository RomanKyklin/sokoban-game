import {CELL_TYPES} from "./cells/cell-types.js";

const DIRECTIONS = {
    LEFT: {x: -1, y: 0},
    TOP: {x: 0, y: -1},
    RIGHT: {x: 1, y: 0},
    BOTTOM: {x: 0, y: 1}
};

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

    go(direction) {
        const player = this.findPlayerPosition();
        this.currentLevelStructure[player.x + direction.x][player.y + direction.y] = CELL_TYPES.PLAYER;
    }

    toRight() {
       this.go(DIRECTIONS.RIGHT);
    }

    toLeft() {
        this.go(DIRECTIONS.LEFT);
    }

    toTop() {
        this.go(DIRECTIONS.TOP);
    }

    toBottom() {
        this.go(DIRECTIONS.BOTTOM);
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
