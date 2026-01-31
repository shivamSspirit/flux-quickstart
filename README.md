# FluxRPC Quickstart

Your first Solana RPC call in under 2 minutes.

## What You'll Learn

- ✅ Check wallet SOL balance
- ✅ Get blockhash for transactions
- ✅ Read account data from the blockchain

## Quick Start

### 1. Get Your API Key

Go to [dashboard.fluxbeam.xyz/admin/apikeys](https://dashboard.fluxbeam.xyz/admin/apikeys) and create a free API key.

### 2. Clone & Install

```bash
git clone https://github.com/shivamSspirit/flux-quickstart.git
cd flux-quickstart
npm install
```

### 3. Add Your API Key

```bash
cp .env.example .env
```

Edit `.env` and add your key:
```env
FLUXRPC_API_KEY=your-api-key-here
FLUXRPC_REGION=eu
```

### 4. Run

```bash
npm run dev
```

### Expected Output

```
🚀 FluxRPC Quickstart

1️⃣  getBalance
   Wallet:  DLRPZSrex3dk58mbJxfKEaxPMazchNogvZDSh26BhgRi
   Balance: 0.035737443 SOL
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

## The 3 Essential Methods

### 1. getBalance

Check how much SOL any wallet has.

```typescript
const { sol } = await getBalance('YOUR_WALLET_ADDRESS');
console.log(`Balance: ${sol} SOL`);
```

**Returns:**
```typescript
{
  address: string;   // The wallet address
  lamports: number;  // Balance in lamports (1 SOL = 1B lamports)
  sol: number;       // Balance in SOL
}
```

### 2. getBlockhash

Get the latest blockhash. **Required before sending any transaction.**

```typescript
const { blockhash } = await getBlockhash();
// Use this blockhash when building your transaction
```

**Returns:**
```typescript
{
  blockhash: string;           // Current blockhash
  lastValidBlockHeight: number; // Block height until this hash is valid
}
```

### 3. getAccountInfo

Read account details from the blockchain.

```typescript
const info = await getAccountInfo('YOUR_WALLET_ADDRESS');
if (info.exists) {
  console.log(`Owner: ${info.owner}`);
}
```

**Returns:**
```typescript
{
  address: string;      // The account address
  exists: boolean;      // Does the account exist?
  owner?: string;       // Program that owns this account
  lamports?: number;    // Balance in lamports
  executable?: boolean; // Is this a program account?
  dataLength?: number;  // Size of account data in bytes
}
```

## Project Structure

```
flux-quickstart/
├── src/
│   └── index.ts      # Main code with 3 RPC methods
├── dist/             # Compiled JavaScript
├── .env.example      # Environment template
├── .env              # Your config (git-ignored)
├── package.json
├── tsconfig.json
└── README.md
```

## FluxRPC Endpoints

| Region | Endpoint |
|--------|----------|
| Europe | `https://eu.fluxrpc.com/?key=YOUR_KEY` |
| US | `https://us.fluxrpc.com/?key=YOUR_KEY` |

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run build` | Compile TypeScript |
| `npm run dev` | Build and run |
| `npm start` | Run compiled code |

## Next Steps

- 📖 [FluxRPC Documentation](https://fluxrpc.com)
- 🔑 [Get API Key](https://dashboard.fluxbeam.xyz/admin/apikeys)
- 📚 [Solana Cookbook](https://solanacookbook.com/)
- 💻 [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)

## License

MIT

---

Built with ❤️ for Solana developers
