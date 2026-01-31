# FluxRPC Quickstart

Make your first Solana RPC call in under 2 minutes.

## 3 Essential Methods

| Method | What it does | Returns |
|--------|--------------|---------|
| `getBalance` | Check wallet SOL balance | `{ address, lamports, sol }` |
| `getBlockhash` | Get blockhash for transactions | `{ blockhash, lastValidBlockHeight }` |
| `getSlot` | Get current slot and block time | `{ slot, timestamp }` |

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/shivamSspirit/flux-quickstart.git
cd flux-quickstart
npm install

# 2. Add your API key
cp .env.example .env
# Edit .env → add your key from dashboard.fluxbeam.xyz/admin/apikeys

# 3. Run
npm run dev
```

**Output:**
```
🚀 FluxRPC Quickstart

1️⃣  getBalance
   Address: DLRPZSrex3dk58mbJxfKEaxPMazchNogvZDSh26BhgRi
   Balance: 0.035 SOL
   Latency: 145ms

2️⃣  getLatestBlockhash
   Blockhash: CrZEthopHdJNLp49aC3Dn7G1SMBRnzPGdECQnAZMicZM
   Valid until block: 375,266,854

3️⃣  getSlot
   Current slot: 397,146,781
   Block time: 2026-01-31T14:20:00.000Z

✅ Done!
```

## Usage

### Setup

```typescript
import { getBalance, getBlockhash, getSlot } from './index';
```

### Get Balance

```typescript
const result = await getBalance('YOUR_WALLET_ADDRESS');

console.log(result.sol);      // 8.5
console.log(result.lamports); // 8500000000
```

### Get Blockhash

```typescript
const { blockhash, lastValidBlockHeight } = await getBlockhash();

// Use blockhash when building transactions
```

### Get Slot

```typescript
const { slot, timestamp } = await getSlot();

console.log(`Slot: ${slot}`);
console.log(`Time: ${new Date(timestamp * 1000).toISOString()}`);
```

## Project Structure

```
flux-quickstart/
├── src/
│   └── index.ts    # Types, Config, Utils, RPC Methods, Demo
├── dist/           # Compiled output
├── .env.example    # Environment template
├── .env            # Your API key (git-ignored)
└── package.json
```

## Type Definitions

```typescript
interface BalanceResult {
  address: string;
  lamports: number;
  sol: number;
}

interface BlockhashResult {
  blockhash: string;
  lastValidBlockHeight: number;
}

interface SlotResult {
  slot: number;
  timestamp: number;
}
```

## Endpoints

| Region | URL |
|--------|-----|
| Europe | `https://eu.fluxrpc.com/?key=YOUR_KEY` |
| US | `https://us.fluxrpc.com/?key=YOUR_KEY` |

Set region in `.env`:
```env
FLUXRPC_REGION=eu
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Compile TypeScript |
| `npm run dev` | Build + run |

## Resources

- [Get API Key](https://dashboard.fluxbeam.xyz/admin/apikeys)
- [FluxRPC Docs](https://fluxrpc.com)
- [Solana Cookbook](https://solanacookbook.com/)

---

**Get your free API key:** [dashboard.fluxbeam.xyz](https://dashboard.fluxbeam.xyz/admin/apikeys)
