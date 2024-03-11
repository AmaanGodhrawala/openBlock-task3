"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalTvlByDate = exports.fetchPoolData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("./config");
const subgraphUrl = config_1.SUBGRAPH_URLS[34443 /* CHAINS.MODE */][0 /* PROTOCOLS.SUPSWAP */][0 /* AMM_TYPES.UNISWAPV3 */];
async function fetchPoolData() {
    const query = `
    query DailyTotalTVLByDate {
      poolDayDatas(orderBy: date, orderDirection: desc) {
        date
        pool {
          id
          # Add other pool-related fields if needed
        }
        tvlUSD
      }
    }
  `;
    try {
        const response = await (0, node_fetch_1.default)(subgraphUrl, {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        return data.data.poolDayDatas;
    }
    catch (error) {
        throw new Error(`Error fetching pool data: ${error}`);
    }
}
exports.fetchPoolData = fetchPoolData;
function calculateTotalTvlByDate(poolData) {
    const totalTvlByDate = new Map();
    poolData.forEach((entry) => {
        const { date, tvlUSD } = entry;
        const existingTotal = totalTvlByDate.get(date) || 0;
        totalTvlByDate.set(date, Number(existingTotal) + Number(tvlUSD));
    });
    return totalTvlByDate;
}
exports.calculateTotalTvlByDate = calculateTotalTvlByDate;
