import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";
import {ImageTableRenderer} from "./classes/renderers/image-table-renderer.js";
import {EventLoop} from "./classes/event-loop.js";

(function game(document) {
    const gameRenderer = new BgTableRenderer('#root');
    const gameEngine = new GameEngine(gameRenderer);
    const eventLoop = new EventLoop(gameEngine);
    gameRenderer.render();
    eventLoop.initNavigationListeners();
    gameEngine.run();
})(document)
