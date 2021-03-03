import {GameEngine} from "./classes/game-engine.js";
import {GameRenderer} from "./classes/game-renderer.js";

(function game(document) {
    const gameEngine = new GameEngine();
    const gameRenderer = new GameRenderer('#root');
    gameRenderer.render();
    gameEngine.run()
})(document)
