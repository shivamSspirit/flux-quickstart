# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

flux-quickstart - 3 essential Solana RPC methods for beginners.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Build and run
npm run build  # Compile TypeScript only
npm start      # Run compiled code
npm run clean  # Remove dist folder
```

## The 3 Methods

| Method | Purpose | Returns |
|--------|---------|---------|
| `getBalance(address)` | Check wallet SOL balance | `{ address, lamports, sol }` |
| `getBlockhash()` | Get blockhash for transactions | `{ blockhash, lastValidBlockHeight }` |
| `getAccountInfo(address)` | Read account details | `{ exists, owner, lamports, executable, dataLength }` |

## Code Structure

```
src/index.ts
├── Types (exported)      → BalanceResult, BlockhashResult, AccountInfoResult
├── Configuration         → API key from .env, region selection
├── Connection (exported) → Solana Connection instance
├── Utilities (exported)  → isValidPublicKey(), lamportsToSol()
├── RPC Methods (exported)→ getBalance(), getBlockhash(), getAccountInfo()
└── Demo                  → Runs only when executed directly
```

## Environment Variables

```env
FLUXRPC_API_KEY=your-key    # Required
FLUXRPC_REGION=eu           # Optional: 'eu' or 'us'
```

## Endpoints

- EU: `https://eu.fluxrpc.com/?key={KEY}`
- US: `https://us.fluxrpc.com/?key={KEY}`

## Get API Key

https://dashboard.fluxbeam.xyz/admin/apikeys
