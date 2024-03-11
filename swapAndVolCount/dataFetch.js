//Amaan - OBL task 3 

const axios = require('axios');

const startOfToday = new Date();
const endOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0); 
// startOfToday.setDay(0,); 


endOfToday.setHours(23, 59, 59, 999); 

const startTimestamp = Math.floor(startOfToday.getTime() / 1000);
const endTimestamp = Math.floor(endOfToday.getTime() / 1000);
let totalSwapCount = 0;
let skipCount = 0;
// const batchSize = 100;
const batchSize = 1000; 
async function fetchSwapData() {
  const swapCountQuery = `
    query totalSwapCountForToday {
      swaps(
        first: ${batchSize}
        skip: ${skipCount * batchSize}
        where: {
          timestamp_gte: ${startTimestamp},
          timestamp_lt: ${endTimestamp}
        }
      ) {
        timestamp
      }
    }
  `;

  try {
    const response = await axios.post('https://api.goldsky.com/api/public/project_clrhmyxsvvuao01tu4aqj653e/subgraphs/supswap-exchange-v3/1.0.0/gn', { query: swapCountQuery });
    const batchSwapCount = response.data.data.swaps.length;

    if (batchSwapCount > 0) {
      totalSwapCount += batchSwapCount;
      skipCount++;
      await fetchSwapData(); 
    } else {
      console.log('Daily Swap counts:', totalSwapCount);


      const volumeInUSDQuery = `
        query totalVolumeForToday {
          supDayDatas(
            first: 1
            orderBy: date
            orderDirection: desc
          ) {
            date
            volumeUSD
          }
        }
      `;

      const volumeResponse = await axios.post('https://api.goldsky.com/api/public/project_clrhmyxsvvuao01tu4aqj653e/subgraphs/supswap-exchange-v3/1.0.0/gn', { query: volumeInUSDQuery });
      const dailyVolumeUSD = volumeResponse.data.data.supDayDatas[0].volumeUSD;
      console.log('Daily Volume in USD:', dailyVolumeUSD);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}
// if()
fetchSwapData();
