import Box from "../cells/image-table-cells/box.js";
import {Ground} from "../cells/image-table-cells/ground.js";
import {Player} from "../cells/image-table-cells/player.js";
import {BrownBox} from "../cells/image-table-cells/brown-box.js";
import {Environment} from "../cells/image-table-cells/environment.js";
import {BgTableRenderer} from "./bg-table-renderer.js";

export class ImageTableRenderer extends BgTableRenderer {
    constructor(rootElementSelector) {
        super(rootElementSelector);
    }

    getFirstLevelStructure() {
        return [
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
            [
                new Box(),
                new Ground(),
                new Ground(),
                new Player(),
                new Ground(),
                new Box(),
            ],
            [
                new Box(),
                new BrownBox(),
                new Box(),
                new Box(),
                new Box(),
                new Box()
            ],
            [
                new Box(),
                new Ground(),
                new Box()
            ],
            [
                new Box(),
                new Environment(),
                new Box()
            ],
            [
                new Box(),
                new Box(),
                new Box()
            ]
        ]
    };

    getSecondLevelStructure() {
        return [
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
            [
                new Box(),
                new Player(),
                new Ground(),
                new Ground(),
                new Ground(),
                new Box(),
            ],
            [
                new Box(),
                new Ground(),
                new Ground(),
                new BrownBox(),
                new Environment(),
                new Box()
            ],
            [
                new Box(),
                new Ground(),
                new Environment(),
                new BrownBox(),
                new Ground(),
                new Box()
            ],
            [
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
                new Box(),
            ],
        ]
    }
}
