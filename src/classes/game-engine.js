import CellTypes from "./cells/cell-types.js";

export class GameEngine {
    constructor(gameRenderer) {
        this.gameRenderer = gameRenderer;
    }

    WIN_MESSAGE_TIMEOUT = 0;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';
    NEXT_LEVEL_MESSAGE = 'Хотите перейти на следующий уровень ?';
    DO_NOT_HAVE_NEXT_LEVEL_MESSAGE = 'Следующий уровень отсутствует! Вы прошли финальный уровень.'

    environments = [];

    refreshEnvironmentsToWin() {
        this.environments = [];
    }

    isBox(element) {
        return element.getType() === CellTypes.BOX_TYPE;
    }

    isBrownBox(element) {
        return element.getType() === CellTypes.BROWN_BOX_TYPE;
    }

    isEnvironmentBox(element) {
        return element.getType() === CellTypes.ENVIRONMENT_TYPE;
    }

    isGround(element) {
        return element.getType() === CellTypes.GROUND_TYPE;
    }

    isSaturatedBox(element) {
        return element.getType() === CellTypes.SATURATED_BOX_TYPE;
    }

    isPlayerSaturated() {
        const {player} = this.gameRenderer.getCurrentPlayerData();
        return player.getType() === CellTypes.SATURATED_PLAYER_TYPE;
    }

    playerMeetBrownBox(
        elementFromPlayer,
        playerDirectionFn,
        getElementFromFn,
    ) {
        const {element, rowIndex, cellIndex} = this.gameRenderer.getElementFullData(elementFromPlayer);
        const fromBrownBoxElement = getElementFromFn(rowIndex, cellIndex);
        if (this.isGround(fromBrownBoxElement)) {
            this.gameRenderer.changePositions(fromBrownBoxElement, elementFromPlayer);
            playerDirectionFn();
        } else if (this.isEnvironmentBox(fromBrownBoxElement)) {
            this.gameRenderer.changePositions(elementFromPlayer, fromBrownBoxElement);
            playerDirectionFn();
            const saturatedBox = this.gameRenderer.saturatedBoxAndReturnNewElement(elementFromPlayer);
            this.gameRenderer.changeElementToGround(fromBrownBoxElement);
            this.boxMeetEnvironment(saturatedBox, fromBrownBoxElement);
        }
    }

    playerMeetSaturatedBox(nextElement, playerDirectionFn, getElementFromFn) {
        const {rowIndex, cellIndex, element} = this.gameRenderer.getElementFullData(nextElement);
        const nextToSaturatedBoxElement = getElementFromFn(rowIndex, cellIndex);

        if (!this.isBox(nextToSaturatedBoxElement)) {
            this.boxLeaveEnvironment(nextElement);
            this.gameRenderer.unSaturateBoxActions(this.gameRenderer.getElementFullData(nextElement));
            this.playerMeetBrownBox(
                this.gameRenderer.unSaturateBoxAndReturnNewElement(nextElement),
                playerDirectionFn,
                getElementFromFn
            );
        }
    }

    boxMeetEnvironment(saturatedBoxObj, environment) {
        this.environments.push([saturatedBoxObj, environment]);

        if (this.environments.length === this.getEnvironmentsToWin().length) {
            this.win()
        }
    }

    boxLeaveEnvironment(saturatedBoxObj) {
        const environmentBoxArray = this.environments.find(val => val.includes(saturatedBoxObj));

        if (!environmentBoxArray) {
            throw new Error('environments array doesnt have this specific saturated box');
        }

        this.environments = this.environments.filter(val => !val.includes(saturatedBoxObj));
    }

    getEnvironmentsToWin() {
        const gameStructure = this.gameRenderer.getCurrentLevelStructure();
        const environments = [];
        gameStructure.forEach(row => {
            row.forEach(cell => {
                if (this.isEnvironmentBox(cell)) environments.push(cell);
            })
        })
        return environments;
    }

    playerMeetEnvironment(environmentElement, playerDirectionFn) {
        playerDirectionFn();
        this.gameRenderer.saturatePlayer();
        this.gameRenderer.changeElementToGround(environmentElement);
    }

    rightAction() {
        this.gameActions(
            this.gameRenderer.getRightElementFromThePlayer(),
            this.gameRenderer.playerToRight.bind(this.gameRenderer),
            this.gameRenderer.getRightElementFrom.bind(this.gameRenderer)
        );
    }

    leftAction() {
        this.gameActions(
            this.gameRenderer.getLeftElementFromThePlayer(),
            this.gameRenderer.playerToLeft.bind(this.gameRenderer),
            this.gameRenderer.getLeftElementFrom.bind(this.gameRenderer)
        );
    }

    upAction() {
        this.gameActions(
            this.gameRenderer.getTopElementFromThePlayer(),
            this.gameRenderer.playerToTop.bind(this.gameRenderer),
            this.gameRenderer.getTopElementFrom.bind(this.gameRenderer)
        );
    }

    bottomAction() {
        this.gameActions(
            this.gameRenderer.getBottomElementFromThePlayer(),
            this.gameRenderer.playerToBottom.bind(this.gameRenderer),
            this.gameRenderer.getBottomElementFrom.bind(this.gameRenderer)
        );
    }

    gameActions(
        nextElement,
        playerDirectionFn,
        getElementFromFn
    ) {
        if (this.isPlayerSaturated() && !this.isBox(nextElement) && !this.isBrownBox(nextElement)) {
            this.gameRenderer.unSaturatePlayerActions(this.gameRenderer.getCurrentEnvironmentPosition());
        }

        if (this.isGround(nextElement)) {
            playerDirectionFn();
        } else if (this.isBrownBox(nextElement)) {
            this.playerMeetBrownBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        } else if (this.isEnvironmentBox(nextElement)) {
            this.playerMeetEnvironment(
                nextElement,
                playerDirectionFn
            );
        } else if (this.isSaturatedBox(nextElement)) {
            this.playerMeetSaturatedBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        }
        this.postGameActions();
    }

    postGameActions() {
        this.startNewGameListener();
    }

    startNewGameListener() {
        const newGameBtn = this.gameRenderer.getNewGameBtn();
        newGameBtn.addEventListener('click', () => this.startNewGame());
    }

    startNewGame() {
        this.refreshEnvironmentsToWin();
        this.gameRenderer.restartLevel();
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        setTimeout(() => {
            this.showWinMessage();
            this.refreshEnvironmentsToWin();
            const isStartNextLevel = confirm(this.NEXT_LEVEL_MESSAGE);
            if (this.gameRenderer.hasNextLevel() && isStartNextLevel) {
                this.gameRenderer.renderNextLevel();
                return;
            } else if (!this.gameRenderer.hasNextLevel() && isStartNextLevel) {
                alert(this.DO_NOT_HAVE_NEXT_LEVEL_MESSAGE);
            }
            this.startNewGame();
        }, this.WIN_MESSAGE_TIMEOUT)
    }

    run() {
        this.startNewGameListener();
    }
}
