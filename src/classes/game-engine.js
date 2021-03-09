import CellTypes from "./cells/cell-types.js";

export class GameEngine {
    constructor(gameRenderer) {
        this.gameRenderer = gameRenderer;
    }

    WIN_MESSAGE_TIMEOUT = 0;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';
    NEXT_LEVEL_MESSAGE = 'Хотите перейти на следующий уровень ?';
    DO_NOT_HAVE_NEXT_LEVEL_MESSAGE = 'Следующий уровень отсутствует! Вы прошли финальный уровень.'

    KEYBOARD_KEYS = {
        leftArrowKey: 'ArrowLeft',
        rightArrowKey: 'ArrowRight',
        upArrowKey: 'ArrowUp',
        downArrowKey: 'ArrowDown'
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
            this.gameRenderer.saturateBox(elementFromPlayer);
            this.gameRenderer.changeElementToGround(fromBrownBoxElement);
            this.win();
        }
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
        if (this.isPlayerSaturated() && !this.isBox(nextElement)) {
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
            this.playerMeetBrownBox(
                this.gameRenderer.unSaturateBoxAndReturnNewElement(nextElement),
                playerDirectionFn,
                getElementFromFn
            )
        }
    }

    movementListeners() {
        document.addEventListener('keydown', $e => {
            const {key} = $e;

            switch (key) {
                case this.KEYBOARD_KEYS.leftArrowKey:
                    this.leftAction();
                    return;
                case this.KEYBOARD_KEYS.rightArrowKey:
                    this.rightAction();
                    return;
                case this.KEYBOARD_KEYS.upArrowKey:
                    this.upAction();
                    return;
                case this.KEYBOARD_KEYS.downArrowKey:
                    this.bottomAction();
                    return;
                default:
                    return;
            }
        })
    }

    startNewGameListener() {
        const newGameBtn = this.gameRenderer.getNewGameBtn();
        newGameBtn.addEventListener('click', () => this.startNewGame());
    }

    startNewGame() {
        this.gameRenderer.restartLevel();
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        setTimeout(() => {
            this.showWinMessage();
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
        this.movementListeners();
    }
}
