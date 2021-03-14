export class GameEngine {
    constructor(gameRenderer, playingField, levelsManager) {
        this.gameRenderer = gameRenderer;
        this.playingField = playingField;
        this.levelsManager = levelsManager;
    }

    WIN_MESSAGE_TIMEOUT = 0;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';
    NEXT_LEVEL_MESSAGE = 'Хотите перейти на следующий уровень ?';
    DO_NOT_HAVE_NEXT_LEVEL_MESSAGE = 'Следующий уровень отсутствует! Вы прошли финальный уровень.'

    environments = [];

    refreshEnvironmentsToWin() {
        this.environments = [];
    }

    playerMeetBrownBox(
        elementFromPlayer,
        playerDirectionFn,
        getElementFromFn,
    ) {
        const {element, rowIndex, cellIndex} = this.gameRenderer.getElementFullData(elementFromPlayer);
        const fromBrownBoxElement = getElementFromFn(rowIndex, cellIndex);
        if (this.playingField.isGround(fromBrownBoxElement)) {
            this.gameRenderer.changePositions(fromBrownBoxElement, elementFromPlayer);
            playerDirectionFn();
        } else if (this.playingField.isEnvironmentBox(fromBrownBoxElement)) {
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

        if (!this.playingField.isBox(nextToSaturatedBoxElement)) {
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
        const gameStructure = this.levelsManager.getCurrentLevel();
        const environments = [];
        gameStructure.forEach(row => {
            row.forEach(cell => {
                if (this.playingField.isEnvironmentBox(cell)) environments.push(cell);
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
        if (this.playingField.isPlayerSaturated(this.gameRenderer.getCurrentPlayerData().player)
            && !this.playingField.isBox(nextElement)
            && !this.playingField.isBrownBox(nextElement)) {
            this.gameRenderer.unSaturatePlayerActions(this.gameRenderer.getCurrentEnvironmentPosition());
        }

        if (this.playingField.isGround(nextElement)) {
            playerDirectionFn();
        } else if (this.playingField.isBrownBox(nextElement)) {
            this.playerMeetBrownBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        } else if (this.playingField.isEnvironmentBox(nextElement)) {
            this.playerMeetEnvironment(
                nextElement,
                playerDirectionFn
            );
        } else if (this.playingField.isSaturatedBox(nextElement)) {
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
            if (this.levelsManager.hasNextLevel() && isStartNextLevel) {
                this.gameRenderer.renderNextLevel();
                return;
            } else if (!this.levelsManager.hasNextLevel() && isStartNextLevel) {
                alert(this.DO_NOT_HAVE_NEXT_LEVEL_MESSAGE);
            }
            this.startNewGame();
        }, this.WIN_MESSAGE_TIMEOUT);
    }

    run() {
        this.startNewGameListener();
    }
}
