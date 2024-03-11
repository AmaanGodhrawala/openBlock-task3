"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionLibrary = void 0;
const internalConstants_1 = require("../utils/internalConstants");
const tickLibrary_1 = require("../utils/tickLibrary");
class PositionLibrary {
    /**
     * Cannot be constructed.
     */
    constructor() { }
    // replicates the portions of Position#update required to compute unaccounted fees
    static getTokensOwed(feeGrowthInside0LastX128, feeGrowthInside1LastX128, liquidity, feeGrowthInside0X128, feeGrowthInside1X128) {
        const tokensOwed0 = ((0, tickLibrary_1.subIn256)(feeGrowthInside0X128, feeGrowthInside0LastX128) * liquidity) / internalConstants_1.Q128;
        const tokensOwed1 = ((0, tickLibrary_1.subIn256)(feeGrowthInside1X128, feeGrowthInside1LastX128) * liquidity) / internalConstants_1.Q128;
        return [tokensOwed0, tokensOwed1];
    }
}
exports.PositionLibrary = PositionLibrary;
