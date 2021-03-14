export class LevelsManager {
    constructor(startLevel = 0, levelsStructure = []) {
        this.levelsStructure = levelsStructure;
        this.startLevel = startLevel;
        this.currentLevel = startLevel;
    }

    getCurrentLevel() {
        return this.levelsStructure[this.currentLevel];
    }

    hasNextLevel() {
        return this.levelsStructure[this.currentLevel + 1];
    }

    getNextLevel() {
        if (!this.hasNextLevel()) {
            throw new Error('Next level doesnt exists');
        }
        this.currentLevel += 1;
        return this.levelsStructure[this.currentLevel];
    }
}
