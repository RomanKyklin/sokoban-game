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
        return this.levelsStructure[this.currentLevelIndex + 1];
    }

    getCurrentLevelStructure() {
        return this.currentLevelStructure;
    }

    hasNextLevel() {
        return this.levelsStructure[this.currentLevelIndex + 1] != undefined;
    }

    getElementByDirection(position, direction) {
        return {
            x: position.x + direction.x,
            y: position.y + direction.y
        };
    }

    canIGo(direction, fromPosition) {
        const startPos = fromPosition || this.playerPosition;
        const {x, y} = this.getElementByDirection(startPos, direction);
        const {x: nX, y: nY} = this.getElementByDirection({x, y}, direction);
        const elementByDirection = this.currentLevelStructure[y][x];
        const nextElementByDirection = this.currentLevelStructure[nY][nX];

        if (elementByDirection === CELL_TYPES.WALL
            || (elementByDirection & CELL_TYPES.BOX && nextElementByDirection === CELL_TYPES.WALL)) {
            return false;
        }

        return true;
    }

    findPlayerPosition() {
        this.currentLevelStructure.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell & CELL_TYPES.PLAYER) {
                    this.playerPosition = {x, y};
                }
            })
        })
        return this.playerPosition;
    }

    go(direction) {
        const {x: pX, y: pY} = this.findPlayerPosition();

        if (!this.canIGo(direction)) return false;

        const {x: dX, y: dY} = this.getElementByDirection(this.playerPosition, direction);
        const {x: ddX, y: ddY} = this.getElementByDirection({x: dX, y: dY}, direction);

        if (this.currentLevelStructure[dY][dX] === CELL_TYPES.BOX_ON_EMPTY) {
            this.currentLevelStructure[dY][dX] ^= CELL_TYPES.BOX;
            this.currentLevelStructure[ddY][ddX] |= CELL_TYPES.BOX;
        }

        this.currentLevelStructure[pY][pX] ^= CELL_TYPES.PLAYER;
        this.currentLevelStructure[dY][dX] |= CELL_TYPES.PLAYER;
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
