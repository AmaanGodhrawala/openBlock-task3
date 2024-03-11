# Supswap OpenBlock Labs Technical Case Study

## Introduction

This repository contains the solution to the technical case study provided by OpenBlock Labs. The study involves retrieving specific information from Supswap, an Automated Market Maker (AMM), through its API subgraph endpoint and widget.

## Contents

1. [Project Overview](#project-overview)
2. [Tasks](#tasks)
3. [Folder Structure](#folder-structure)
4. [Usage](#usage)

## Project Overview

Supswap is an AMM with a v3 API subgraph endpoint available at [https://api.goldsky.com/api/public/project_clrhmyxsvvuao01tu4aqj653e/subgraphs/supswap-exchange-v3/1.0.0/gn](https://api.goldsky.com/api/public/project_clrhmyxsvvuao01tu4aqj653e/subgraphs/supswap-exchange-v3/1.0.0/gn). Additionally, its widget is accessible at [https://github.com/SupSwap/tvl-snapshot](https://github.com/SupSwap/tvl-snapshot).

## Tasks

### 1. Total Daily Volume and Swap Counts
The solution to this task is located in the `swapAndVolCount` folder. The `dataFetch.js` file within this folder retrieves and calculates the total Daily Volume in USD and Daily Swap counts from Supswap's v3 API subgraph endpoint.
The graphQL query provided by me will retrieve `Daily Swap Counts` and `Daily Volume in USD` as required by the task.

### 2. Last 5 Days of TVL by User by Pool USD Balance
The solution to this task is in the `TVL-task` folder. I wrote required query and calculations in the `poolDetails.ts` which can be found in the `TVL-tasl\src\sdk\`  contains the code for retrieving the  TVL (Total Value Locked) by User by Pool USD balance. \
The `index.ts` file serves as the main entry point for executing and displaying the results. I have commented out the previously showing `getData` function so as to showcase the `last 5 days TVL` and `the total TVL` in USD in the last 5 days.

## Folder Structure

The project is organized as follows:
 The `swapAndVolCount` folder contains the solution for Task 1. \
 The `TVL-task` folder contains the solution for Task 2.

## Usage

1. **Total Daily Volume and Swap Counts**
   - Navigate to the `swapAndVolCount` folder.
   - Execute the `dataFetch.js` file. using `node dataFetch.js` command.
   - Review the console output for the total Daily Volume in USD and Daily Swap counts.
   - sample output:
   `Daily Swap counts: 10843` \
   `Daily Volume in USD: 7599.60049054358516172111432593543`

2. **Last 5 Days of TVL by User by Pool USD Balance**
   - Navigate to the `TVL-task` folder.
   - Execute the `index.ts` file. This can be done by `npm run compile` followed by `npm run start`.
   - Review the console output for the last 5 days of TVL by User by Pool USD balance.
   - Also, in `index.ts` I made a variable `let lastNdays = 5` here you can change according to your requirement to get last n days of TVL value.
   - sample output:
   ``` 
    Date: 1710115200, Total TVL: 1276704.4943336393  
    ====================== 
    Date: 1710028800, Total TVL: 1309668.7733044988 
    ====================== 
    Date: 1709942400, Total TVL: 1302216.5607864647
    ====================== 
    Date: 1709856000, Total TVL: 1310142.5734764873 
    ====================== 
    Date: 1709769600, Total TVL: 1567893.186083837 
    ====================== 
    Total TVL in USD of last 5 : 6766625.587984927
   ```
