import { useState } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { SparrowWallet } from '../types/wallet';

interface TransactionsTabProps {
  wallet: SparrowWallet;
  btcPrice: number;
}

export default function TransactionsTab({ wallet, btcPrice }: TransactionsTabProps) {
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSats = (sats: number) => {
    return new Intl.NumberFormat('en-US').format(Math.abs(sats));
  };

  const formatUSD = (sats: number) => {
    const btc = Math.abs(sats) / 100000000;
    const usd = btc * btcPrice;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usd);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateTxId = (txid: string) => {
    return `${txid.slice(0, 8)}...${txid.slice(-8)}`;
  };

  const sortedTransactions = [...wallet.transactions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedTransactions.map((tx) => (
        <div
          key={tx.txid}
          className="rounded-2xl border overflow-hidden transition-all"
          style={{ background: 'linear-gradient(to bottom, #3A3A3C 0%, #2C2C2E 100%)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          <div
            className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setExpandedTxId(expandedTxId === tx.txid ? null : tx.txid)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: tx.value > 0 ? '#00D395' : '#FF5B5B' }}
                />
                <div>
                  <div className="text-white font-semibold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>
                    {tx.value > 0 ? '+' : ''}{formatSats(tx.value)} sats
                  </div>
                  <div className="text-white/55 text-sm">{formatUSD(tx.value)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white/75">{tx.label || 'No label'}</div>
                  <div className="text-white/55 text-sm">{formatDate(tx.date)}</div>
                </div>
                {expandedTxId === tx.txid ? (
                  <ChevronUp className="w-5 h-5 text-white/55" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/55" />
                )}
              </div>
            </div>
          </div>

          {expandedTxId === tx.txid && (
            <div className="px-5 pb-5 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="space-y-3">
                <div>
                  <div className="text-white/55 text-xs mb-1">Transaction ID</div>
                  <div className="flex items-center gap-2">
                    <div className="text-white/75 text-sm font-mono">{truncateTxId(tx.txid)}</div>
                    <button
                      onClick={() => copyToClipboard(tx.txid)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-white/55" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="text-white/55 text-xs mb-1">Confirmations</div>
                    <div className="text-white/75 text-sm">{tx.confirmations}</div>
                  </div>
                  {tx.blockHeight && (
                    <div>
                      <div className="text-white/55 text-xs mb-1">Block Height</div>
                      <div className="text-white/75 text-sm">{tx.blockHeight}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
