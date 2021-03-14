export class LevelsManager {
    constructor(startLevelIndex = 0, levelsStructure = []) {
        this.levelsStructure = levelsStructure;
        this.startLevelIndex = startLevelIndex;
        this.currentLevelIndex = startLevelIndex;
    }

    getCurrentLevel() {
        return this.levelsStructure[this.currentLevelIndex];
    }

    hasNextLevel() {
        return this.levelsStructure[this.currentLevelIndex + 1];
    }

    getNextLevel() {
        if (!this.hasNextLevel()) {
            throw new Error('Next level doesnt exists');
        }
        this.currentLevelIndex += 1;
        return this.levelsStructure[this.currentLevelIndex];
    }
}
