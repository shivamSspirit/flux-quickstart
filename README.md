# FluxRPC Quickstart

Make your first Solana RPC call in under 2 minutes.

## 3 Essential Methods

| Method | What it does | Returns |
|--------|--------------|---------|
| `getBalance` | Check wallet SOL balance | `{ address, lamports, sol }` |
| `getBlockhash` | Get blockhash for transactions | `{ blockhash, lastValidBlockHeight }` |
| `getTransaction` | Look up transaction by signature | `{ found, success, fee, slot }` |

## Quick Start

```bash
# 1. Clone & install
git clone <repo-url> && cd fluxrpc-quickstart
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
   Address: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg
   Balance: 8.5 SOL

2️⃣  getLatestBlockhash
   Blockhash: 4jPdy63xgBgn6ZuRkxABFXoQ9NmUgSV6exioKZeoSdXj
   Valid until: 375,259,262

3️⃣  getTransaction
   Status: ✅ Success
   Fee: 0.000005 SOL
   Slot: 375,250,000

✅ Done!
```

## Usage

### Setup

```typescript
import { getBalance, getBlockhash, getTransaction } from './index';
```

### Get Balance

```typescript
const result = await getBalance('vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg');

console.log(result.sol);      // 8.5
console.log(result.lamports); // 8500000000
console.log(result.address);  // vines1vzr...
```

### Get Blockhash

```typescript
const { blockhash, lastValidBlockHeight } = await getBlockhash();

// Use blockhash when building transactions
console.log(blockhash); // 4jPdy63xgBgn6ZuRkx...
```

### Get Transaction

```typescript
const tx = await getTransaction('5UfDuX7WXY18keiz...');

if (tx.found) {
  console.log(tx.success); // true
  console.log(tx.fee);     // 0.000005
  console.log(tx.slot);    // 375250000
}
```

## Project Structure

```
fluxrpc-quickstart/
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

interface TransactionResult {
  signature: string;
  found: boolean;
  success?: boolean;
  fee?: number;
  slot?: number;
}
```

## Endpoints

| Region | URL |
|--------|-----|
| Europe | `https://eu.fluxrpc.com?key=YOUR_KEY` |
| US | `https://us.fluxrpc.com?key=YOUR_KEY` |

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

## Next Steps

- [Get API Key](https://dashboard.fluxbeam.xyz/admin/apikeys)
- [FluxRPC Docs](https://fluxrpc.com)
- [Solana Cookbook](https://solanacookbook.com/)

---

**Get your free API key:** [dashboard.fluxbeam.xyz](https://dashboard.fluxbeam.xyz/admin/apikeys)
