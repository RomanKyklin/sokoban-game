import {EventLoop} from "../event-loop.js";
import {GameMediator} from "../mediators/game-mediator.js";

export class GameFacade {
    constructor(gameRenderer, gameEngine, eventLoop, gameMediator) {
        this.gameRenderer = gameRenderer;
        this.gameEngine = gameEngine;
        this.eventLoop = eventLoop;
        this.gameMediator = gameMediator;
    }

    settingUpSubscriptions() {
        this.settingUpInstall();
        this.settingUpGameEngineSubscriptions();
        this.settingsUpGameRendererSubscriptions();
    }

    settingUpGameEngineSubscriptions() {
        this.gameEngine.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.left,
            () => {
                this.gameEngine.leftAction.call(this.gameEngine);
                this.gameEngine.publish.bind(this.gameMediator)(GameMediator.GAME_ENGINE_ACTIONS.on_left);
            }
        );
        this.gameEngine.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.right,
            () => {
                this.gameEngine.rightAction.call(this.gameEngine);
                this.gameEngine.publish.bind(this.gameMediator)(GameMediator.GAME_ENGINE_ACTIONS.on_right);
            }
        );
        this.gameEngine.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.top,
            () => {
                this.gameEngine.upAction.call(this.gameEngine);
                this.gameEngine.publish.bind(this.gameMediator)(GameMediator.GAME_ENGINE_ACTIONS.on_top);
            }
        );
        this.gameEngine.subscribe.bind(this.gameMediator)(
            EventLoop.ACTION_TYPES.bottom,
            () => {
                this.gameEngine.bottomAction.call(this.gameEngine);
                this.gameEngine.publish.bind(this.gameMediator)(GameMediator.GAME_ENGINE_ACTIONS.on_bottom);
            }
        );
    }

    settingsUpGameRendererSubscriptions() {
        this.gameRenderer.subscribe.bind(this.gameMediator)(
            GameMediator.GAME_ENGINE_ACTIONS.on_left,
            () => this.gameRenderer.render.call(this.gameRenderer)
        );
        this.gameRenderer.subscribe.bind(this.gameMediator)(
            GameMediator.GAME_ENGINE_ACTIONS.on_right,
            () => this.gameRenderer.render.call(this.gameRenderer)
        );
        this.gameRenderer.subscribe.bind(this.gameMediator)(
            GameMediator.GAME_ENGINE_ACTIONS.on_top,
            () => this.gameRenderer.render.call(this.gameRenderer)
        );
        this.gameRenderer.subscribe.bind(this.gameMediator)(
            GameMediator.GAME_ENGINE_ACTIONS.on_bottom,
            () => this.gameRenderer.render.call(this.gameRenderer)
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
