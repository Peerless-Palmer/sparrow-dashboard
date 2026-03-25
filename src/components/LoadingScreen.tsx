import { Upload } from 'lucide-react';

interface LoadingScreenProps {
  onFileLoad: (file: File) => void;
}

export default function LoadingScreen({ onFileLoad }: LoadingScreenProps) {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileLoad(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to right, #2C2C2E 0%, #1C1C1E 100%)' }}>
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #7B61FF 0%, #4D9FFF 100%)' }}>
            <Upload className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Bitcoin Wallet</h1>
          <p className="text-white/55 text-lg">Load your Sparrow wallet to get started</p>
        </div>

        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept=".json,.mv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105"
               style={{ background: 'linear-gradient(135deg, #7B61FF 0%, #4D9FFF 100%)' }}>
            Load Sparrow Wallet
          </div>
        </label>
      </div>
    </div>
  );
}
