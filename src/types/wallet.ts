export interface Keystore {
  xpub: string;
  derivation: string;
  masterFingerprint: string;
}

export interface Transaction {
  txid: string;
  date: string;
  value: number;
  label?: string;
  blockHeight?: number;
  confirmations: number;
}

export interface UTXO {
  txid: string;
  value: number;
  address: string;
  confirmations: number;
}

export interface SparrowWallet {
  name: string;
  keystores: Keystore[];
  transactions: Transaction[];
  utxos: UTXO[];
}

export const mockWalletData: SparrowWallet = {
  name: "My Bitcoin Wallet",
  keystores: [
    {
      xpub: "xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz",
      derivation: "m/84'/0'/0'",
      masterFingerprint: "f23f9fd2"
    }
  ],
  transactions: [
    {
      txid: "7c3be24063f268aaa1ed81b64776798f56088757641a34fb156c4f51ed2e9d25",
      date: "2026-03-21T10:30:00Z",
      value: 50000000,
      label: "Received from Exchange",
      blockHeight: 835000,
      confirmations: 3
    },
    {
      txid: "9f2ae8b5c1d7e3f4a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
      date: "2026-03-20T14:20:00Z",
      value: -10000000,
      label: "Payment to merchant",
      blockHeight: 834950,
      confirmations: 53
    },
    {
      txid: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
      date: "2026-03-19T08:15:00Z",
      value: 25000000,
      label: "Mining reward",
      blockHeight: 834900,
      confirmations: 103
    },
    {
      txid: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      date: "2026-03-18T16:45:00Z",
      value: -5000000,
      label: "Fee payment",
      blockHeight: 834850,
      confirmations: 153
    },
    {
      txid: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3",
      date: "2026-03-15T12:00:00Z",
      value: 100000000,
      label: "Large transfer",
      blockHeight: 834500,
      confirmations: 503
    },
    {
      txid: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4",
      date: "2026-03-10T09:30:00Z",
      value: -20000000,
      label: "Withdrawal",
      blockHeight: 834000,
      confirmations: 1003
    },
    {
      txid: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5",
      date: "2026-03-05T15:20:00Z",
      value: 75000000,
      blockHeight: 833500,
      confirmations: 1503
    }
  ],
  utxos: [
    {
      txid: "7c3be24063f268aaa1ed81b64776798f56088757641a34fb156c4f51ed2e9d25",
      value: 50000000,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      confirmations: 3
    },
    {
      txid: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
      value: 25000000,
      address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      confirmations: 103
    },
    {
      txid: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3",
      value: 100000000,
      address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      confirmations: 503
    },
    {
      txid: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5",
      value: 75000000,
      address: "bc1q5shngj0z4pjn3qkce6q3xjjqnr5qeq7fwz8x2r",
      confirmations: 1503
    },
    {
      txid: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6",
      value: 15000000,
      address: "bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3",
      confirmations: 2003
    },
    {
      txid: "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7",
      value: 8000000,
      address: "bc1q9vza2e8x9a9e8x9a9e8x9a9e8x9a9e8x9a9e8x9",
      confirmations: 500
    }
  ]
};
