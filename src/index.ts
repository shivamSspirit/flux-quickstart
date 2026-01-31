/**
 * FluxRPC Quickstart
 *
 * 3 essential RPC methods every Solana developer needs.
 *
 * API Key: https://dashboard.fluxbeam.xyz/admin/apikeys
 * Docs: https://fluxrpc.com
 */

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  type BlockhashWithExpiryBlockHeight,
  type VersionedTransactionResponse,
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

interface TransactionResult {
  signature: string;
  found: boolean;
  success?: boolean;
  fee?: number;
  slot?: number;
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

const RPC_URL = `https://${FLUXRPC_REGION}.fluxrpc.com?key=${FLUXRPC_API_KEY}`;

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
 * Look up a transaction by signature
 *
 * @example
 * const tx = await getTransaction('5UfDuX7WXY18keiz...');
 * if (tx.found) console.log(`Fee: ${tx.fee} SOL`);
 */
export async function getTransaction(signature: string): Promise<TransactionResult> {
  const tx: VersionedTransactionResponse | null = await connection.getTransaction(
    signature,
    { maxSupportedTransactionVersion: 0 }
  );

  if (!tx) {
    return { signature, found: false };
  }

  return {
    signature,
    found: true,
    success: tx.meta?.err === null,
    fee: lamportsToSol(tx.meta?.fee ?? 0),
    slot: tx.slot,
  };
}

// =============================================================================
// Demo
// =============================================================================

async function demo(): Promise<void> {
  // Example data
  const WALLET = 'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg';
  const TX_SIG = '5UfDuX7WXY18keiz9mZ6zKkY8JyNuLDFz2UEDLYwvdpFvoxw9fSgLz7EXi25FJRPBBjAmJo8Xc3DnjnV9CjGuVMA';

  console.log('\n🚀 FluxRPC Quickstart\n');

  // 1. getBalance
  console.log('1️⃣  getBalance');
  const balance = await getBalance(WALLET);
  console.log(`   Address: ${balance.address}`);
  console.log(`   Balance: ${balance.sol} SOL\n`);

  // 2. getBlockhash
  console.log('2️⃣  getLatestBlockhash');
  const block = await getBlockhash();
  console.log(`   Blockhash: ${block.blockhash}`);
  console.log(`   Valid until: ${block.lastValidBlockHeight.toLocaleString()}\n`);

  // 3. getTransaction
  console.log('3️⃣  getTransaction');
  const tx = await getTransaction(TX_SIG);
  if (tx.found) {
    console.log(`   Status: ${tx.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Fee: ${tx.fee} SOL`);
    console.log(`   Slot: ${tx.slot?.toLocaleString()}`);
  } else {
    console.log('   Not found (old or invalid signature)');
  }

  console.log('\n✅ Done!\n');
}

// Run demo
demo().catch((err: Error) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
