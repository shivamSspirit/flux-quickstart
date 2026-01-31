/**
 * FluxRPC Quickstart
 *
 * Essential RPC methods every Solana developer needs.
 *
 * API Key: https://dashboard.fluxbeam.xyz/admin/apikeys
 * Docs: https://fluxrpc.com
 */

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  type BlockhashWithExpiryBlockHeight,
} from '@solana/web3.js';
import 'dotenv/config';

// =============================================================================
// Types
// =============================================================================

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

type Region = 'eu' | 'us';

// =============================================================================
// Configuration
// =============================================================================

const FLUXRPC_API_KEY = process.env.FLUXRPC_API_KEY;
const FLUXRPC_REGION = (process.env.FLUXRPC_REGION as Region) || 'eu';

if (!FLUXRPC_API_KEY) {
  console.error('\n❌ Missing FLUXRPC_API_KEY in .env file');
  console.error('   Get your key: https://dashboard.fluxbeam.xyz/admin/apikeys\n');
  process.exit(1);
}

// =============================================================================
// Connection
// =============================================================================

const RPC_URL = `https://${FLUXRPC_REGION}.fluxrpc.com/?key=${FLUXRPC_API_KEY}`;

const connection = new Connection(RPC_URL, {
  commitment: 'confirmed',
});

// =============================================================================
// Utilities
// =============================================================================

function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL;
}

// =============================================================================
// RPC Methods
// =============================================================================

/**
 * Get SOL balance of a wallet
 *
 * @example
 * const { sol } = await getBalance('vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg');
 * console.log(`Balance: ${sol} SOL`);
 */
export async function getBalance(address: string): Promise<BalanceResult> {
  if (!isValidPublicKey(address)) {
    throw new Error(`Invalid address: ${address}`);
  }

  const publicKey = new PublicKey(address);
  const lamports = await connection.getBalance(publicKey);

  return {
    address,
    lamports,
    sol: lamportsToSol(lamports),
  };
}

/**
 * Get latest blockhash (required for transactions)
 *
 * @example
 * const { blockhash } = await getBlockhash();
 * // Use blockhash when building a transaction
 */
export async function getBlockhash(): Promise<BlockhashResult> {
  const result: BlockhashWithExpiryBlockHeight =
    await connection.getLatestBlockhash();

  return {
    blockhash: result.blockhash,
    lastValidBlockHeight: result.lastValidBlockHeight,
  };
}

/**
 * Get current slot and block time
 *
 * @example
 * const { slot } = await getSlot();
 * console.log(`Current slot: ${slot}`);
 */
export async function getSlot(): Promise<SlotResult> {
  const slot = await connection.getSlot();
  const timestamp = await connection.getBlockTime(slot);

  return {
    slot,
    timestamp: timestamp || Date.now() / 1000,
  };
}

// =============================================================================
// Demo
// =============================================================================

async function demo(): Promise<void> {
  const WALLET = 'DLRPZSrex3dk58mbJxfKEaxPMazchNogvZDSh26BhgRi';

  console.log('\n🚀 FluxRPC Quickstart\n');

  // 1. getBalance
  console.log('1️⃣  getBalance');
  const startTime = Date.now();
  const balance = await getBalance(WALLET);
  const latency = Date.now() - startTime;
  console.log(`   Address: ${balance.address}`);
  console.log(`   Balance: ${balance.sol} SOL`);
  console.log(`   Latency: ${latency}ms\n`);

  // 2. getLatestBlockhash
  console.log('2️⃣  getLatestBlockhash');
  const block = await getBlockhash();
  console.log(`   Blockhash: ${block.blockhash}`);
  console.log(`   Valid until block: ${block.lastValidBlockHeight.toLocaleString()}\n`);

  // 3. getSlot
  console.log('3️⃣  getSlot');
  const slotInfo = await getSlot();
  const blockTime = new Date(slotInfo.timestamp * 1000).toISOString();
  console.log(`   Current slot: ${slotInfo.slot.toLocaleString()}`);
  console.log(`   Block time: ${blockTime}\n`);

  console.log('✅ Done!\n');
}

// Run demo
demo().catch((err: Error) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
