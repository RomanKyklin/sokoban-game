import {GAME_ENGINE_ACTIONS} from "./mediators/game-mediator.js";

export class EventLoop {
    constructor(mediator) {
        this.mediator = mediator;
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

            if (this.isLeftAction(code)) {
                this.mediator.publish(GAME_ENGINE_ACTIONS.on_left);
            } else if (this.isRightAction(code)) {
                this.mediator.publish(GAME_ENGINE_ACTIONS.on_right);
            } else if (this.isTopAction(code)) {
                this.mediator.publish(GAME_ENGINE_ACTIONS.on_top);
            } else if (this.isBottomAction(code)) {
                this.mediator.publish(GAME_ENGINE_ACTIONS.on_bottom);
            }
        })
    }
}
