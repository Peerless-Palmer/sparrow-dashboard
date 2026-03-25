import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SparrowWallet } from '../types/wallet';

interface PortfolioTabProps {
  wallet: SparrowWallet;
}

export default function PortfolioTab({ wallet }: PortfolioTabProps) {
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
        setPriceChange24h(data.bitcoin.usd_24h_change);
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
        setBtcPrice(85000);
        setPriceChange24h(2.5);
      } finally {
        setLoading(false);
      }
    };

    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalSats = wallet.utxos.reduce((sum, utxo) => sum + utxo.value, 0);
  const totalBTC = totalSats / 100000000;
  const totalUSD = totalBTC * btcPrice;

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatSats = (sats: number) => {
    return new Intl.NumberFormat('en-US').format(sats);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-8 border" style={{ background: 'linear-gradient(to bottom, #3A3A3C 0%, #2C2C2E 100%)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <div className="text-white/55 text-sm mb-2">Total Balance</div>
        <div className="flex items-baseline gap-4 mb-1">
          <div className="text-6xl font-semibold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>{formatSats(totalSats)}</div>
          <div className="text-3xl text-white/55">sats</div>
        </div>
        <div className="text-2xl text-white/75 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>{totalBTC.toFixed(8)} BTC</div>

        {loading ? (
          <div className="text-white/55">Loading price...</div>
        ) : (
          <>
            <div className="text-3xl font-semibold text-white mb-2">{formatUSD(totalUSD)}</div>
            <div className="flex items-center gap-2">
              {priceChange24h >= 0 ? (
                <>
                  <ArrowUp className="w-4 h-4" style={{ color: '#00D395' }} />
                  <span style={{ color: '#00D395' }}>+{priceChange24h.toFixed(2)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="w-4 h-4" style={{ color: '#FF5B5B' }} />
                  <span style={{ color: '#FF5B5B' }}>{priceChange24h.toFixed(2)}%</span>
                </>
              )}
              <span className="text-white/55 text-sm">24h</span>
            </div>
          </>
        )}
      </div>

      <div className="rounded-2xl p-6 border" style={{ background: 'linear-gradient(to bottom, #3A3A3C 0%, #2C2C2E 100%)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <div className="text-white/55 text-sm mb-4">Assets</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F7931A' }}>
              <span className="text-white font-bold text-xl">₿</span>
            </div>
            <div>
              <div className="text-white font-semibold text-lg">{wallet.name}</div>
              <div className="text-white/55 text-sm">{totalBTC.toFixed(8)} BTC</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold text-lg">{formatSats(totalSats)} sats</div>
            {!loading && <div className="text-white/55 text-sm">{formatUSD(totalUSD)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
