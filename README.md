# Minimal AMM DEX (Single Pair)

Core features:
- Deposits/Withdrawals (internal balances)
- Basic token swaps (constant product, 0.3% fee)
- Liquidity provide/remove (LP token)
- Price calculation utilities

## Stack
- Solidity 0.8.24
- Hardhat + Ethers v6
- OpenZeppelin contracts

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Compile:
   ```bash
   npm run build
   ```
3. Start a local node (optional in another terminal):
   ```bash
   npx hardhat node
   ```
4. Deploy sample stack (two ERC20s + DEX with initial liquidity) to Hardhat in-process network:
   ```bash
   npm run deploy
   ```
5. Demo flow (deploys fresh stack, add liquidity, deposit/withdraw, swap):
   ```bash
   npm run demo
   ```

## Contracts
- `contracts/DEX.sol`: AMM with:
  - `deposit(token, amount)`, `withdraw(token, amount)`
  - `addLiquidity(amount0, amount1)`, `removeLiquidity(lpAmount)`
  - `swapExactTokensForTokens(tokenIn, amountIn, minOut, to)`
  - `getAmountOut(amountIn, tokenIn)`, `getPrice(baseToken)`
- `contracts/LPToken.sol`: ERC20 LP token, mint/burn controlled by DEX.
- `contracts/TestToken.sol`: Simple ERC20 for testing.

## Notes
- This is an educational minimal example. No oracle, no TWAP, no protocol fees, no flash loan guards beyond reentrancy, single-pair only.
- For production, add robust validation, events coverage, upgradeability strategy, access controls, and audits.


