"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = void 0;
const bignumber_js_1 = require("bignumber.js");
const getPrice = (sqrtPriceX96, Decimal0, Decimal1) => {
    console.log("sqrtPriceX96 : " + sqrtPriceX96.toString());
    console.log("Decimal0 : " + Decimal0);
    console.log("Decimal1 : " + Decimal1);
    const twoPower96 = new bignumber_js_1.BigNumber(2).pow(96);
    const tenPowerDecimal0 = new bignumber_js_1.BigNumber(10).pow(Decimal0);
    const tenPowerDecimal1 = new bignumber_js_1.BigNumber(10).pow(Decimal1);
    // Perform calculations using BigNumber for high precision arithmetic
    const priceSquared = (sqrtPriceX96.dividedBy(twoPower96)).pow(2);
    console.log("priceSquared : " + priceSquared.toString());
    const ratio = priceSquared.multipliedBy(tenPowerDecimal0).dividedBy(tenPowerDecimal1);
    console.log("ratio : " + ratio.toString());
    // Convert to string with fixed decimal places for display
    const buyOneOfToken0 = ratio.toFixed(Decimal1);
    const buyOneOfToken1 = new bignumber_js_1.BigNumber(1).div(ratio).toFixed(Decimal0);
    console.log(`price of token0 in value of token1 : ${buyOneOfToken0}`);
    console.log(`price of token1 in value of token0 : ${buyOneOfToken1}`);
    console.log("");
    // Convert to lowest decimal representation for display
    const buyOneOfToken0Wei = ratio.multipliedBy(tenPowerDecimal1).toFixed(0);
    const buyOneOfToken1Wei = new bignumber_js_1.BigNumber(1).div(ratio).multipliedBy(tenPowerDecimal0).toFixed(0);
    console.log(`price of token0 in value of token1 in lowest decimal : ${buyOneOfToken0Wei}`);
    console.log(`price of token1 in value of token1 in lowest decimal : ${buyOneOfToken1Wei}`);
    console.log("");
};
exports.getPrice = getPrice;
// // Example usage with BigNumber inputs:
// // Convert string inputs to BigNumber. Ensure the input values are strings to prevent precision loss.
// getPrice(new BigNumber('3956146591263498000000000'), 18, 6);
