import { SparrowWallet } from '../types/wallet';

interface UTXOsTabProps {
  wallet: SparrowWallet;
}

export default function UTXOsTab({ wallet }: UTXOsTabProps) {
  const formatSats = (sats: number) => {
    return new Intl.NumberFormat('en-US').format(sats);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getCardSize = (value: number, maxValue: number) => {
    const ratio = value / maxValue;
    if (ratio > 0.7) return 'large';
    if (ratio > 0.4) return 'medium';
    return 'small';
  };

  const getOpacity = (confirmations: number) => {
    if (confirmations > 1000) return 1;
    if (confirmations > 500) return 0.9;
    if (confirmations > 100) return 0.8;
    if (confirmations > 50) return 0.7;
    return 0.6;
  };

  const maxValue = Math.max(...wallet.utxos.map(u => u.value));
  const sortedUTXOs = [...wallet.utxos].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-lg">Unspent Outputs</div>
          <div className="text-white/55 text-sm">{wallet.utxos.length} UTXOs</div>
        </div>
        <div className="text-white/55 text-sm">
          Total: {formatSats(wallet.utxos.reduce((sum, u) => sum + u.value, 0))} sats
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedUTXOs.map((utxo, index) => {
          const size = getCardSize(utxo.value, maxValue);
          const opacity = getOpacity(utxo.confirmations);

          return (
            <div
              key={`${utxo.txid}-${index}`}
              className="rounded-2xl p-6 border transition-all hover:scale-105"
              style={{
                background: `rgba(123, 97, 255, ${opacity * 0.15})`,
                borderColor: `rgba(123, 97, 255, ${opacity * 0.3})`,
                gridColumn: size === 'large' ? 'span 2' : 'span 1'
              }}
            >
              <div className="space-y-4">
                <div>
                  <div className="text-white/55 text-xs mb-1">Amount</div>
                  <div className={`text-white font-semibold ${size === 'large' ? 'text-3xl' : size === 'medium' ? 'text-2xl' : 'text-xl'}`}>
                    {formatSats(utxo.value)}
                  </div>
                  <div className="text-white/55 text-sm">sats</div>
                </div>

                <div>
                  <div className="text-white/55 text-xs mb-1">Address</div>
                  <div className="text-white/75 text-sm font-mono">{truncateAddress(utxo.address)}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div>
                    <div className="text-white/55 text-xs">Confirmations</div>
                    <div className="text-white/75 text-sm font-semibold">{utxo.confirmations}</div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: utxo.confirmations > 100 ? '#00A856' : utxo.confirmations > 6 ? '#4D9FFF' : '#F7931A',
                      color: 'white'
                    }}
                  >
                    {utxo.confirmations > 100 ? 'Confirmed' : utxo.confirmations > 6 ? 'Secure' : 'Pending'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
