import Box from "./cells/bg-table-cells/box.js";
import {BrownBox} from "./cells/bg-table-cells/brown-box.js";
import {Environment} from "./cells/bg-table-cells/environment.js";

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

    isBox(element) {
        return element instanceof Box;
    }

    isBrownBox(element) {
        return element instanceof BrownBox;
    }

    isEnvironmentBox(element) {
        return element instanceof Environment;
    }

    rightAction() {
        const rightElement = this.gameRenderer.getRightElementFromThePlayer();

        if (!this.isBox(rightElement) && !this.isBrownBox(rightElement)) {
            this.gameRenderer.playerToRight();
        } else if (!this.isBox(rightElement) && this.isBrownBox(rightElement)) {


        } else if (this.isEnvironmentBox(rightElement)) {
            this.gameRenderer.playerToRight();
            this.gameRenderer.saturatePlayer();
        } else {
            this.gameRenderer.unSaturatePlayer();
        }
    }

    leftAction() {
        const leftElement = this.gameRenderer.getLeftElementFromThePlayer();

        if (!this.isBox(leftElement) && !this.isBrownBox(leftElement)) {
            this.gameRenderer.playerToLeft();
        }
    }

    upAction() {
        const topElement = this.gameRenderer.getTopElementFromThePlayer();

        if (!this.isBox(topElement) && !this.isBrownBox(topElement)) {
            this.gameRenderer.playerToTop();
        }
    }

    bottomAction() {
        const bottomElement = this.gameRenderer.getBottomElementFromThePlayer();

        if (!this.isBox(bottomElement) && !this.isBrownBox(bottomElement)) {
            this.gameRenderer.playerToTop();
        }

        this.gameRenderer.playerToBottom();
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

    startNewGame() {
        this.gameRenderer.render();
    }

    showWinMessage() {
        alert(this.WIN_MESSAGE_TEXT);
    }

    win() {
        this.showWinMessage();
        this.startNewGame();
    }

    run() {
        this.movementListeners();
    }
}
