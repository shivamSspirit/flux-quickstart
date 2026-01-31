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
  type AccountInfo,
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

interface AccountInfoResult {
  address: string;
  exists: boolean;
  owner?: string;
  lamports?: number;
  executable?: boolean;
  dataLength?: number;
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
 * const { sol } = await getBalance('YOUR_WALLET_ADDRESS');
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
 * Get latest blockhash (required for sending transactions)
 *
 * @example
 * const { blockhash } = await getBlockhash();
 * // Use this blockhash when building your transaction
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
 * Get account information (owner, data size, executable status)
 *
 * @example
 * const info = await getAccountInfo('YOUR_WALLET_ADDRESS');
 * if (info.exists) console.log(`Owner: ${info.owner}`);
 */
export async function getAccountInfo(address: string): Promise<AccountInfoResult> {
  if (!isValidPublicKey(address)) {
    throw new Error(`Invalid address: ${address}`);
  }

  const publicKey = new PublicKey(address);
  const account: AccountInfo<Buffer> | null = await connection.getAccountInfo(publicKey);

  if (!account) {
    return { address, exists: false };
  }

  return {
    address,
    exists: true,
    owner: account.owner.toBase58(),
    lamports: account.lamports,
    executable: account.executable,
    dataLength: account.data.length,
  };
}

// =============================================================================
// Demo
// =============================================================================

async function demo(): Promise<void> {
  const WALLET = 'DLRPZSrex3dk58mbJxfKEaxPMazchNogvZDSh26BhgRi';

  console.log('\n🚀 FluxRPC Quickstart\n');

  // 1. getBalance - Check wallet balance
  console.log('1️⃣  getBalance');
  const startTime = Date.now();
  const balance = await getBalance(WALLET);
  const latency = Date.now() - startTime;
  console.log(`   Wallet:  ${balance.address}`);
  console.log(`   Balance: ${balance.sol} SOL`);
  console.log(`   Latency: ${latency}ms\n`);

  // 2. getLatestBlockhash - Get blockhash for transactions
  console.log('2️⃣  getLatestBlockhash');
  const block = await getBlockhash();
  console.log(`   Blockhash: ${block.blockhash}`);
  console.log(`   Valid until: ${block.lastValidBlockHeight.toLocaleString()}\n`);

  // 3. getAccountInfo - Get account details
  console.log('3️⃣  getAccountInfo');
  const account = await getAccountInfo(WALLET);
  if (account.exists) {
    console.log(`   Owner: ${account.owner}`);
    console.log(`   Lamports: ${account.lamports?.toLocaleString()}`);
    console.log(`   Executable: ${account.executable}`);
    console.log(`   Data size: ${account.dataLength} bytes`);
  } else {
    console.log('   Account not found');
  }

  console.log('\n✅ Done!\n');
}

// Run demo
demo().catch((err: Error) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
