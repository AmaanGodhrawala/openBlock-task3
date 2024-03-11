"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLPValueByUserAndPoolFromPositions = exports.getPositionDetailsFromPosition = exports.getPositionAtBlock = exports.getPositionsForAddressByPoolAtBlock = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const config_1 = require("./config");
const positionMath_1 = require("./utils/positionMath");
;
const getPositionsForAddressByPoolAtBlock = async (blockNumber, address, poolId, chainId, protocol, ammType) => {
    let subgraphUrl = config_1.SUBGRAPH_URLS[chainId][protocol][ammType];
    let blockQuery = blockNumber !== 0 ? ` block: {number: ${blockNumber}}` : ``;
    let poolQuery = poolId !== "" ? ` pool_:{id: "${poolId.toLowerCase()}"}` : ``;
    let ownerQuery = address !== "" ? `owner: "${address.toLowerCase()}"` : ``;
    let whereQuery = ownerQuery !== "" && poolQuery !== "" ? `where: {${ownerQuery} , ${poolQuery}}` : ownerQuery !== "" ? `where: {${ownerQuery}}` : poolQuery !== "" ? `where: {${poolQuery}}` : ``;
    let skip = 0;
    let fetchNext = true;
    let result = [];
    while (fetchNext) {
        let query = `{
            positions(${whereQuery} ${blockQuery} orderBy: transaction__timestamp, first:1000,skip:${skip}) {
            id

                liquidity
                owner
                pool {
                    sqrtPrice
                    tick
                    id
                }
                tickLower{
                    tickIdx
                }
                tickUpper{
                    tickIdx
                }
                token0 {
                    id
                    decimals
                    derivedUSD
                    name
                    symbol
                }
                token1 {
                    id
                    decimals
                    derivedUSD
                    name
                    symbol
                }
            },
            _meta{
                    block{
                    number
                }
            }
        }`;
        // console.log(query)
        let response = await fetch(subgraphUrl, {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: { "Content-Type": "application/json" },
        });
        let data = await response.json();
        let positions = data.data.positions;
        for (let i = 0; i < positions.length; i++) {
            let position = positions[i];
            let transformedPosition = {
                id: position.id,
                liquidity: BigInt(position.liquidity),
                owner: position.owner,
                pool: {
                    sqrtPrice: BigInt(position.pool.sqrtPrice),
                    tick: Number(position.pool.tick),
                    id: position.pool.id,
                },
                tickLower: {
                    tickIdx: Number(position.tickLower.tickIdx),
                },
                tickUpper: {
                    tickIdx: Number(position.tickUpper.tickIdx),
                },
                token0: {
                    id: position.token0.id,
                    decimals: position.token0.decimals,
                    derivedUSD: position.token0.derivedUSD,
                    name: position.token0.name,
                    symbol: position.token0.symbol,
                },
                token1: {
                    id: position.token1.id,
                    decimals: position.token1.decimals,
                    derivedUSD: position.token1.derivedUSD,
                    name: position.token1.name,
                    symbol: position.token1.symbol,
                },
            };
            result.push(transformedPosition);
        }
        if (positions.length < 1000) {
            fetchNext = false;
        }
        else {
            skip += 1000;
        }
    }
    return result;
};
exports.getPositionsForAddressByPoolAtBlock = getPositionsForAddressByPoolAtBlock;
const getPositionAtBlock = async (blockNumber, positionId, chainId, protocol, ammType) => {
    let subgraphUrl = config_1.SUBGRAPH_URLS[chainId][protocol][ammType];
    let blockQuery = blockNumber !== 0 ? `, block: {number: ${blockNumber}}` : ``;
    let query = `{
        position(id: "${positionId}" ${blockQuery}) {
            id
            pool {
                sqrtPrice
                tick
            }
            tickLower{
                tickIdx
            }
            tickUpper{
                tickIdx
            }
            liquidity
            token0 {
                id
                decimals
                derivedUSD
                name
                symbol
            }
            token1 {
                id
                decimals
                derivedUSD
                name
                symbol
            }
        },
        _meta{
                block{
                number
            }
        }
    }`;
    let response = await fetch(subgraphUrl, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    let position = data.data.position;
    return {
        id: position.id,
        liquidity: BigInt(position.liquidity),
        owner: position.owner,
        pool: {
            sqrtPrice: BigInt(position.pool.sqrtPrice),
            tick: Number(position.pool.tick),
            id: position.pool.id,
        },
        tickLower: {
            tickIdx: Number(position.tickLower.tickIdx),
        },
        tickUpper: {
            tickIdx: Number(position.tickUpper.tickIdx),
        },
        token0: {
            id: position.token0.id,
            decimals: position.token0.decimals,
            derivedUSD: position.token0.derivedUSD,
            name: position.token0.name,
            symbol: position.token0.symbol,
        },
        token1: {
            id: position.token1.id,
            decimals: position.token1.decimals,
            derivedUSD: position.token1.derivedUSD,
            name: position.token1.name,
            symbol: position.token1.symbol,
        },
    };
    // let tickLow = Number(position.tickLower.tickIdx);
    // let tickHigh = Number(position.tickUpper.tickIdx);
    // let liquidity = BigInt(position.liquidity);
    // let sqrtPriceX96 = BigInt(position.pool.sqrtPrice);
    // let tick = Number(position.pool.tick);
    // let decimal0 = position.token0.decimals;
    // let decimal1 = position.token1.decimals;
    // let token0DerivedUSD = position.token0.derivedUSD;
    // let token1DerivedUSD = position.token1.derivedUSD;
    // let token0AmountsInWei = PositionMath.getToken0Amount(tick, tickLow, tickHigh, sqrtPriceX96, liquidity);
    // let token1AmountsInWei = PositionMath.getToken1Amount(tick, tickLow, tickHigh, sqrtPriceX96, liquidity);
    // let token0DecimalValue = Number(token0AmountsInWei) / 10 ** decimal0;
    // let token1DecimalValue = Number(token1AmountsInWei) / 10 ** decimal1;
    // let token0UsdValue = BigNumber(token0AmountsInWei.toString()).multipliedBy(token0DerivedUSD).div(10 ** decimal0).toFixed(4);
    // let token1UsdValue = BigNumber(token1AmountsInWei.toString()).multipliedBy(token1DerivedUSD).div(10 ** decimal1).toFixed(4);
    // return [position.token0, position.token1,token0AmountsInWei, token1AmountsInWei, token0DecimalValue, token1DecimalValue,token0UsdValue, token1UsdValue,data.data._meta];
};
exports.getPositionAtBlock = getPositionAtBlock;
const getPositionDetailsFromPosition = (position) => {
    let tickLow = position.tickLower.tickIdx;
    let tickHigh = position.tickUpper.tickIdx;
    let liquidity = position.liquidity;
    let sqrtPriceX96 = position.pool.sqrtPrice;
    let tick = Number(position.pool.tick);
    let decimal0 = position.token0.decimals;
    let decimal1 = position.token1.decimals;
    let token0DerivedUSD = position.token0.derivedUSD;
    let token1DerivedUSD = position.token1.derivedUSD;
    let token0AmountsInWei = positionMath_1.PositionMath.getToken0Amount(tick, tickLow, tickHigh, sqrtPriceX96, liquidity);
    let token1AmountsInWei = positionMath_1.PositionMath.getToken1Amount(tick, tickLow, tickHigh, sqrtPriceX96, liquidity);
    let token0DecimalValue = Number(token0AmountsInWei) / 10 ** decimal0;
    let token1DecimalValue = Number(token1AmountsInWei) / 10 ** decimal1;
    let token0UsdValue = (0, bignumber_js_1.default)(token0AmountsInWei.toString()).multipliedBy(token0DerivedUSD).div(10 ** decimal0).toFixed(4);
    let token1UsdValue = (0, bignumber_js_1.default)(token1AmountsInWei.toString()).multipliedBy(token1DerivedUSD).div(10 ** decimal1).toFixed(4);
    return { ...position, token0USDValue: token0UsdValue, token1USDValue: token1UsdValue, token0AmountsInWei, token1AmountsInWei, token0DecimalValue, token1DecimalValue };
};
exports.getPositionDetailsFromPosition = getPositionDetailsFromPosition;
const getLPValueByUserAndPoolFromPositions = (positions) => {
    let result = new Map();
    for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        let poolId = position.pool.id;
        let owner = position.owner;
        let userPositions = result.get(owner);
        if (userPositions === undefined) {
            userPositions = new Map();
            result.set(owner, userPositions);
        }
        let poolPositions = userPositions.get(poolId);
        if (poolPositions === undefined) {
            poolPositions = (0, bignumber_js_1.default)(0);
        }
        let positionWithUSDValue = (0, exports.getPositionDetailsFromPosition)(position);
        poolPositions = poolPositions.plus((0, bignumber_js_1.default)(positionWithUSDValue.token0USDValue).plus(positionWithUSDValue.token1USDValue));
        userPositions.set(poolId, poolPositions);
    }
    return result;
};
exports.getLPValueByUserAndPoolFromPositions = getLPValueByUserAndPoolFromPositions;
