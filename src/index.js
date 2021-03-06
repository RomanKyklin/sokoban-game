import {GameEngine} from "./classes/game-engine.js";
import {BgTableRenderer} from "./classes/renderers/bg-table-renderer.js";

(function game(document) {
    const gameRenderer = new BgTableRenderer('#root');
    const gameEngine = new GameEngine(gameRenderer);
    gameRenderer.render();
    gameEngine.run()
})(document)
