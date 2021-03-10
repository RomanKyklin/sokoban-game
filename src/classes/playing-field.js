export class PlayingField {
    constructor(cellsFactory) {
        this.cellsFactory = cellsFactory;
    }

    getFirstLevelStructure() {
        return [
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getPlayerInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ]
        ]
    };

    getSecondLevelStructure() {
        return [
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getPlayerInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getEnvironmentInstance(),
                this.cellsFactory.getBrownBoxInstance(),
                this.cellsFactory.getGroundInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
            [
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
                this.cellsFactory.getBoxInstance(),
            ],
        ]
    }
}
