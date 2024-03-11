import fetch from 'node-fetch';
import { AMM_TYPES, CHAINS, PROTOCOLS, SUBGRAPH_URLS } from "./config";
interface PoolDataEntry {
  date: number;
  pool: {
    id: string;
  };
  tvlUSD: number;
}
const subgraphUrl = SUBGRAPH_URLS[CHAINS.MODE][PROTOCOLS.SUPSWAP][AMM_TYPES.UNISWAPV3] ;

export async function fetchPoolData(): Promise<PoolDataEntry[]> {
  const query = `
    query DailyTotalTVLByDate {
      poolDayDatas(orderBy: date, orderDirection: desc) {
        date
        pool {
          id
        }
        tvlUSD
      }
    }
  `;

  try {
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json() as { data: { poolDayDatas: PoolDataEntry[] } };

    return data.data.poolDayDatas;
  } catch (error) {
    throw new Error(`Error fetching pool data: ${error}`);
  }
}

export function calculateTotalTvlByDate(poolData: PoolDataEntry[]) {
  const totalTvlByDate = new Map<number, number>();

  poolData.forEach((entry) => {
    const { date, tvlUSD } = entry;
    const existingTotal = totalTvlByDate.get(date) || 0;
    totalTvlByDate.set(date, Number(existingTotal) + Number(tvlUSD));
  });

  return totalTvlByDate;
}
