export class EventLoop {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
    }

    KEYBOARD_CODES = {
        leftCodes: ['ArrowLeft', 'KeyA'],
        rightCodes: ['ArrowRight', 'KeyD'],
        topCodes: ['ArrowUp', 'KeyW'],
        bottomCodes: ['ArrowDown', 'KeyS'],
    }

    isRightAction(code) {
        return this.KEYBOARD_CODES.rightCodes.includes(code);
    }

    isLeftAction(code) {
        return this.KEYBOARD_CODES.leftCodes.includes(code);
    }

    isTopAction(code) {
        return this.KEYBOARD_CODES.topCodes.includes(code);
    }

    isBottomAction(code) {
        return this.KEYBOARD_CODES.bottomCodes.includes(code);
    }

    initNavigationListeners() {
        document.addEventListener('keydown', $e => {
            const {code} = $e;
            if (this.isLeftAction(code)) this.gameEngine.leftAction();
            else if (this.isRightAction(code)) this.gameEngine.rightAction();
            else if (this.isTopAction(code)) this.gameEngine.upAction();
            else if (this.isBottomAction(code)) this.gameEngine.bottomAction()
        })
    }
}
