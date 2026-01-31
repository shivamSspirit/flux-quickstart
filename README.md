# FluxRPC Quickstart

Make your first Solana RPC call in under 2 minutes.

## 3 Essential Methods

| Method | What it does | Returns |
|--------|--------------|---------|
| `getBalance` | Check wallet SOL balance | `{ address, lamports, sol }` |
| `getBlockhash` | Get blockhash for transactions | `{ blockhash, lastValidBlockHeight }` |
| `getAccountInfo` | Get account details | `{ owner, lamports, executable, dataLength }` |

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
   Wallet:  DLRPZSrex3dk58mbJxfKEaxPMazchNogvZDSh26BhgRi
   Balance: 0.035 SOL
   Latency: 145ms

2️⃣  getLatestBlockhash
   Blockhash: Zb6cPmjqh9UmdG4TP4QRVDsjFEinDzze8CY2mrgXgEv
   Valid until: 375,270,398

3️⃣  getAccountInfo
   Owner: 11111111111111111111111111111111
   Lamports: 35,737,443
   Executable: false
   Data size: 0 bytes

✅ Done!
```

## Usage

### Setup

```typescript
import { getBalance, getBlockhash, getAccountInfo } from './index';
```

### Get Balance

```typescript
const result = await getBalance('YOUR_WALLET_ADDRESS');

console.log(result.sol);      // 0.035
console.log(result.lamports); // 35737443
```

### Get Blockhash

```typescript
const { blockhash, lastValidBlockHeight } = await getBlockhash();

// Use blockhash when building transactions
```

### Get Account Info

```typescript
const account = await getAccountInfo('YOUR_WALLET_ADDRESS');

if (account.exists) {
  console.log(account.owner);      // Program that owns this account
  console.log(account.lamports);   // Balance in lamports
  console.log(account.executable); // Is it a program?
  console.log(account.dataLength); // Size of account data
}
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

interface AccountInfoResult {
  address: string;
  exists: boolean;
  owner?: string;
  lamports?: number;
  executable?: boolean;
  dataLength?: number;
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
