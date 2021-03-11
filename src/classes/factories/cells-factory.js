import {Player as BgTablePlayer} from "../cells/bg-table-cells/player.js";
import BgTableBox from "../cells/bg-table-cells/box.js";
import {BrownBox as BgTableBrownBox} from "../cells/bg-table-cells/brown-box.js";
import {Environment as BgTableEnvironment} from "../cells/bg-table-cells/environment.js";
import {Ground as BgTableGround} from "../cells/bg-table-cells/ground.js";
import {SaturatedBox as BgTableSaturatedBox} from "../cells/bg-table-cells/saturated-box.js";
import {SaturatedPlayer as BgTableSaturatedPlayer} from "../cells/bg-table-cells/saturated-player.js";

import {Player as BgImagePlayer} from "../cells/image-table-cells/player.js";
import BgImageBox from "../cells/image-table-cells/box.js";
import {BrownBox as BgImageBrownBox} from "../cells/image-table-cells/brown-box.js";
import {Environment as BgImageEnvironment} from "../cells/image-table-cells/environment.js";
import {Ground as BgImageGround} from "../cells/image-table-cells/ground.js";
import {SaturatedBox as BgImageSaturatedBox} from "../cells/image-table-cells/saturated-box.js";
import {SaturatedPlayer as BgImageSaturatedPlayer} from "../cells/image-table-cells/saturated-player.js";
import CellTypes from "../cells/cell-types.js";

export class CellsFactory {
    static BG_TYPES = {
        bg_table: 'bg_table',
        bg_image: 'bg_image'
    }

    cells = {};

    constructor(bgType) {
        this.initializeCells(bgType);
    }

    initializeCells(bgType) {
        if (bgType === CellsFactory.BG_TYPES.bg_table) {
            this.cells = {
                [CellTypes.PLAYER_TYPE]: BgTablePlayer,
                [CellTypes.BOX_TYPE]: BgTableBox,
                [CellTypes.BROWN_BOX_TYPE]: BgTableBrownBox,
                [CellTypes.ENVIRONMENT_TYPE]: BgTableEnvironment,
                [CellTypes.GROUND_TYPE]: BgTableGround,
                [CellTypes.SATURATED_BOX_TYPE]: BgTableSaturatedBox,
                [CellTypes.SATURATED_PLAYER_TYPE]: BgTableSaturatedPlayer
            }
        } else if (bgType === CellsFactory.BG_TYPES.bg_image) {
            this.cells = {
                [CellTypes.PLAYER_TYPE]: BgImagePlayer,
                [CellTypes.BOX_TYPE]: BgImageBox,
                [CellTypes.BROWN_BOX_TYPE]: BgImageBrownBox,
                [CellTypes.ENVIRONMENT_TYPE]: BgImageEnvironment,
                [CellTypes.GROUND_TYPE]: BgImageGround,
                [CellTypes.SATURATED_BOX_TYPE]: BgImageSaturatedBox,
                [CellTypes.SATURATED_PLAYER_TYPE]: BgImageSaturatedPlayer
            }
        } else {
            throw new Error(`bg type - ${bgType} doesnt exists`);
        }
    }

    getPlayerInstance() {
        return new this.cells[CellTypes.PLAYER_TYPE];
    }

    getBoxInstance() {
        return new this.cells[CellTypes.BOX_TYPE];
    }

    getBrownBoxInstance() {
        return new this.cells[CellTypes.BROWN_BOX_TYPE];
    }

    getEnvironmentInstance() {
        return new this.cells[CellTypes.ENVIRONMENT_TYPE];
    }

    getGroundInstance() {
        return new this.cells[CellTypes.GROUND_TYPE];
    }

    getSaturatedBoxInstance() {
        return new this.cells[CellTypes.SATURATED_BOX_TYPE];
    }

    getSaturatedPlayerInstance() {
        return new this.cells[CellTypes.SATURATED_PLAYER_TYPE];
    }
}
