export class GameEngine {
    constructor(gameRenderer) {
        this.gameRenderer = gameRenderer;
    }

    WIN_MESSAGE_TIMEOUT = 1000;
    WIN_MESSAGE_TEXT = 'Вы выйграли!';

    KEYBOARD_KEYS = {
        leftArrowKey: 'ArrowLeft',
        rightArrowKey: 'ArrowRight',
        upArrowKey: 'ArrowUp',
        downArrowKey: 'ArrowDown'
    }

    playerMeetBrownBox(
        elementFromPlayer,
        playerDirectionFn,
        getElementFromFn,
    ) {
        const {element, rowIndex, cellIndex} = this.gameRenderer.getElementFullData(elementFromPlayer);
        const fromBrownBoxElement = getElementFromFn(rowIndex, cellIndex);

        if (this.gameRenderer.isGround(fromBrownBoxElement)) {
            this.gameRenderer.changePositions(fromBrownBoxElement, elementFromPlayer);
            playerDirectionFn();
        } else if (this.gameRenderer.isEnvironmentBox(fromBrownBoxElement)) {
            this.gameRenderer.changePositions(elementFromPlayer, fromBrownBoxElement);
            playerDirectionFn();
            this.gameRenderer.saturateBox(elementFromPlayer);
            this.gameRenderer.changeElementToGround(fromBrownBoxElement);
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
        if (this.gameRenderer.isPlayerSaturated() && !this.gameRenderer.isBox(nextElement)) {
            this.gameRenderer.unSaturatePlayerActions(this.gameRenderer.getCurrentEnvironmentPosition());
        }

        if (this.gameRenderer.isGround(nextElement)) {
            playerDirectionFn();
        } else if (this.gameRenderer.isBrownBox(nextElement)) {
            this.playerMeetBrownBox(
                nextElement,
                playerDirectionFn,
                getElementFromFn
            );
        } else if (this.gameRenderer.isEnvironmentBox(nextElement)) {
            this.playerMeetEnvironment(
                nextElement,
                playerDirectionFn
            );
        } else if (this.gameRenderer.isSaturatedBox(nextElement)) {
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
        this.showWinMessage();
        this.startNewGame();
    }

    run() {
        this.startNewGameListener();
        this.movementListeners();
    }
}
