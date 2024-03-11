"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionMath = void 0;
const constant_1 = require("./constant");
const squarePriceMath_1 = require("./squarePriceMath");
const tickMath_1 = require("./tickMath");
function getToken0Amount(tickCurrent, tickLower, tickUpper, sqrtRatioX96, liquidity) {
    if (tickCurrent < tickLower) {
        return squarePriceMath_1.SqrtPriceMath.getAmount0Delta(tickMath_1.TickMath.getSqrtRatioAtTick(tickLower), tickMath_1.TickMath.getSqrtRatioAtTick(tickUpper), liquidity, false);
    }
    if (tickCurrent < tickUpper) {
        return squarePriceMath_1.SqrtPriceMath.getAmount0Delta(sqrtRatioX96, tickMath_1.TickMath.getSqrtRatioAtTick(tickUpper), liquidity, false);
    }
    return constant_1.ZERO;
}
function getToken1Amount(tickCurrent, tickLower, tickUpper, sqrtRatioX96, liquidity) {
    if (tickCurrent < tickLower) {
        return constant_1.ZERO;
    }
    if (tickCurrent < tickUpper) {
        return squarePriceMath_1.SqrtPriceMath.getAmount1Delta(tickMath_1.TickMath.getSqrtRatioAtTick(tickLower), sqrtRatioX96, liquidity, false);
    }
    return squarePriceMath_1.SqrtPriceMath.getAmount1Delta(tickMath_1.TickMath.getSqrtRatioAtTick(tickLower), tickMath_1.TickMath.getSqrtRatioAtTick(tickUpper), liquidity, false);
}
exports.PositionMath = {
    getToken0Amount,
    getToken1Amount,
};
