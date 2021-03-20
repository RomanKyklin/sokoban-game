export class LevelsManager {
    constructor(startLevelIndex = 0, levelsStructure = []) {
        this.levelsStructure = levelsStructure;
        this.startLevelIndex = startLevelIndex;
        this.currentLevelIndex = startLevelIndex;
        this.currentLevelStructure = this.getCurrentLevel();
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

    getNextLevel() {
        if (!this.hasNextLevel()) {
            throw new Error('Next level doesnt exists');
        }
        this.currentLevelIndex += 1;
        this.currentLevelStructure = this.getCurrentLevel();
        return this.levelsStructure[this.currentLevelIndex];
    }
}
