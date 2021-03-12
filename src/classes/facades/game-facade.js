import {EventLoop} from "../event-loop.js";

export class GameFacade {
    constructor(gameRenderer, gameEngine, eventLoop, gameMediator) {
        this.gameRenderer = gameRenderer;
        this.gameEngine = gameEngine;
        this.eventLoop = eventLoop;
        this.gameMediator = gameMediator;
    }

    settingUpSubscriptions() {
        this.settingUpInstall();
        this.settingUpEventLoopSubscriptions();
    }

    settingUpEventLoopSubscriptions() {
        this.eventLoop.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.left,
            this.gameEngine.leftAction.bind(this.gameEngine)
        );
        this.eventLoop.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.right,
            this.gameEngine.rightAction.bind(this.gameEngine)
        );
        this.eventLoop.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.top,
            this.gameEngine.upAction.bind(this.gameEngine)
        );
        this.eventLoop.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.bottom,
            this.gameEngine.bottomAction.bind(this.gameEngine)
        );
    }

    settingUpInstall() {
        this.gameMediator.installTo(this.gameEngine);
        this.gameMediator.installTo(this.gameRenderer);
        this.gameMediator.installTo(this.eventLoop);
    }

    settingUpModules() {
        this.gameRenderer.render();
        this.eventLoop.initNavigationListeners(actionType => {
            this.eventLoop.publish.bind(this.gameMediator, actionType)();
        });
        this.gameEngine.run();
    }

    run() {
        this.settingUpSubscriptions();
        this.settingUpModules();
    }
}
