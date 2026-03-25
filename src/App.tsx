import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, BarChart3, Database, RefreshCw } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import PortfolioTab from './components/PortfolioTab';
import TransactionsTab from './components/TransactionsTab';
import ChartTab from './components/ChartTab';
import UTXOsTab from './components/UTXOsTab';
import { SparrowWallet, mockWalletData } from './types/wallet';

type Tab = 'portfolio' | 'transactions' | 'chart' | 'utxos';

function App() {
  const [wallet, setWallet] = useState<SparrowWallet | null>(mockWalletData);
  const [currentTab, setCurrentTab] = useState<Tab>('portfolio');
  const [btcPrice, setBtcPrice] = useState<number>(85000);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
      }
    };

    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFileLoad = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data.name || !data.keystores || !data.transactions || !data.utxos) {
        setError('Invalid Sparrow wallet file. Please ensure the file contains wallet name, keystores, transactions, and utxos.');
        return;
      }

      setWallet(data);
      setError(null);
    } catch (err) {
      setError('Failed to parse wallet file. Please ensure it is a valid Sparrow wallet file (.json or .mv format).');
      console.error('Parse error:', err);
    }
  };

  const handleRefresh = () => {
    setWallet(null);
    setCurrentTab('portfolio');
    setError(null);
  };

  if (!wallet) {
    return <LoadingScreen onFileLoad={handleFileLoad} />;
  }

  const tabs = [
    { id: 'portfolio' as Tab, label: 'Portfolio', icon: Wallet },
    { id: 'transactions' as Tab, label: 'Transactions', icon: TrendingUp },
    { id: 'chart' as Tab, label: 'Chart', icon: BarChart3 },
    { id: 'utxos' as Tab, label: 'UTXOs', icon: Database }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to right, #2C2C2E 0%, #1C1C1E 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{wallet.name}</h1>
            <p className="text-white/55">Bitcoin Wallet Dashboard</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-3 rounded-xl hover:bg-white/5 transition-colors"
            title="Load different wallet"
          >
            <RefreshCw className="w-5 h-5 text-white/75" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border" style={{ background: '#FF5B5B20', borderColor: '#FF5B5B' }}>
            <p className="text-white">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex gap-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className="tab-button flex items-center gap-2 px-6 py-4 font-medium relative"
                  style={{
                    color: currentTab === tab.id ? 'white' : 'rgba(255,255,255,0.55)',
                    textShadow: currentTab === tab.id ? '0 0 12px rgba(123, 97, 255, 0.4)' : 'none'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {currentTab === tab.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'linear-gradient(135deg, #7B61FF 0%, #4D9FFF 100%)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {currentTab === 'portfolio' && <PortfolioTab wallet={wallet} />}
          {currentTab === 'transactions' && <TransactionsTab wallet={wallet} btcPrice={btcPrice} />}
          {currentTab === 'chart' && <ChartTab wallet={wallet} btcPrice={btcPrice} />}
          {currentTab === 'utxos' && <UTXOsTab wallet={wallet} />}
        </div>
      </div>
    </div>
  );
}

export default App;
