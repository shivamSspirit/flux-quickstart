# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

FluxRPC quickstart - 3 essential Solana RPC methods with TypeScript.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Build and run
```

## Methods

| Function | Returns |
|----------|---------|
| `getBalance(address)` | `{ address, lamports, sol }` |
| `getBlockhash()` | `{ blockhash, lastValidBlockHeight }` |
| `getAccountInfo(address)` | `{ owner, lamports, executable, dataLength }` |

## Code Structure

```
src/index.ts
├── Types         → BalanceResult, BlockhashResult, AccountInfoResult
├── Configuration → API key validation, region
├── Connection    → Reusable Connection instance
├── Utilities     → isValidPublicKey, lamportsToSol
├── RPC Methods   → getBalance, getBlockhash, getAccountInfo
└── Demo          → Example usage
```

## Config

`.env` file:
```
FLUXRPC_API_KEY=your-key
FLUXRPC_REGION=eu
```

## Endpoints

- EU: `https://eu.fluxrpc.com/?key={KEY}`
- US: `https://us.fluxrpc.com/?key={KEY}`

## API Key

https://dashboard.fluxbeam.xyz/admin/apikeys
