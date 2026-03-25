import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SparrowWallet } from '../types/wallet';

interface ChartTabProps {
  wallet: SparrowWallet;
  btcPrice: number;
}

type TimeRange = '1W' | '1M' | '3M' | 'ALL';

export default function ChartTab({ wallet, btcPrice }: ChartTabProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('ALL');

  const chartData = useMemo(() => {
    const sortedTransactions = [...wallet.transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const data = [];
    let cumulativeBalance = 0;

    for (const tx of sortedTransactions) {
      cumulativeBalance += tx.value;
      const btcValue = cumulativeBalance / 100000000;
      const usdValue = btcValue * btcPrice;

      data.push({
        date: new Date(tx.date).getTime(),
        dateStr: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: cumulativeBalance,
        usdValue: usdValue
      });
    }

    const now = Date.now();
    const filterDate = {
      '1W': now - 7 * 24 * 60 * 60 * 1000,
      '1M': now - 30 * 24 * 60 * 60 * 1000,
      '3M': now - 90 * 24 * 60 * 60 * 1000,
      'ALL': 0
    }[timeRange];

    return data.filter(d => d.date >= filterDate);
  }, [wallet.transactions, btcPrice, timeRange]);

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const timeRanges: TimeRange[] = ['1W', '1M', '3M', 'ALL'];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 border" style={{ background: 'linear-gradient(to bottom, #3A3A3C 0%, #2C2C2E 100%)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="text-white font-semibold text-lg">Portfolio Value</div>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: timeRange === range ? 'linear-gradient(135deg, #7B61FF 0%, #4D9FFF 100%)' : 'transparent',
                  color: timeRange === range ? 'white' : 'rgba(255,255,255,0.55)',
                  border: timeRange === range ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7B61FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4D9FFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="dateStr"
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.55)' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.55)' }}
              tickFormatter={formatUSD}
            />
            <Tooltip
              contentStyle={{
                background: '#252540',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white'
              }}
              formatter={(value: number) => [formatUSD(value), 'Value']}
            />
            <Area
              type="monotone"
              dataKey="usdValue"
              stroke="#7B61FF"
              strokeWidth={3}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
