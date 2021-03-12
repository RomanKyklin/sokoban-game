export class EventLoop {
    constructor() {
    }

    KEYBOARD_CODES = {
        leftCodes: ['ArrowLeft', 'KeyA'],
        rightCodes: ['ArrowRight', 'KeyD'],
        topCodes: ['ArrowUp', 'KeyW'],
        bottomCodes: ['ArrowDown', 'KeyS'],
    }

    static ACTION_TYPES = {
        right: 'right',
        left: 'left',
        top: 'top',
        bottom: 'bottom'
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

    initNavigationListeners(actionTypeFn) {
        document.addEventListener('keydown', $e => {
            const {code} = $e;

            if (this.isLeftAction(code)) {
                actionTypeFn(EventLoop.ACTION_TYPES.left)
            } else if (this.isRightAction(code)) {
                actionTypeFn(EventLoop.ACTION_TYPES.right)
            } else if (this.isTopAction(code)) {
                actionTypeFn(EventLoop.ACTION_TYPES.top)
            } else if (this.isBottomAction(code)) {
                actionTypeFn(EventLoop.ACTION_TYPES.bottom)
            }
        })
    }
}
