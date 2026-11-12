import React, { useState } from 'react';
import { TokenConfig } from './types/token';
import { Header } from './components/Header';
import { ContractStudio } from './components/ContractStudio';
import { GitGuide } from './components/GitGuide';
import { RemixDeployGuide } from './components/RemixDeployGuide';
import { WalletImportGuide } from './components/WalletImportGuide';
import { TestnetDirectory } from './components/TestnetDirectory';
import { TokenSimulator } from './components/TokenSimulator';
import { DeployChecklistModal } from './components/DeployChecklistModal';
import { ExternalLink, Layers, ShieldCheck, Terminal, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('contract');
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);

  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    name: 'SepoliaEduToken',
    symbol: 'SET',
    decimals: 18,
    initialSupply: '1,000,000',
    isBurnable: false,
    isMintable: true,
    isPausable: false,
    isCapped: false,
    capSupply: '2,000,000',
    license: 'MIT',
    solidityVersion: '0.8.20',
    openZeppelinVersion: '5.0.2',
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Contract (1 line Brand wordmark — 4-5 single line links — 1 primary action) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'contract' && (
          <ContractStudio
            config={tokenConfig}
            setConfig={setTokenConfig}
            onGoToRemix={() => setActiveTab('git')}
          />
        )}

        {activeTab === 'git' && (
          <GitGuide
            config={tokenConfig}
            onProceedToRemix={() => setActiveTab('remix')}
          />
        )}

        {activeTab === 'remix' && (
          <RemixDeployGuide
            config={tokenConfig}
            onProceedToWallet={() => setActiveTab('wallet')}
            onGoToFaucets={() => setActiveTab('testnets')}
          />
        )}

        {activeTab === 'wallet' && (
          <WalletImportGuide config={tokenConfig} />
        )}

        {activeTab === 'testnets' && (
          <TestnetDirectory />
        )}

        {activeTab === 'simulator' && (
          <TokenSimulator config={tokenConfig} />
        )}
      </main>

      {/* Deployment Readiness Modal */}
      <DeployChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Subtle Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#060a12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">EVM Testnet Token Lab</span>
            <span aria-hidden="true">·</span>
            <span>Educational Solidity &amp; OpenZeppelin Reference</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              onClick={() => setActiveTab('contract')}
              className="hover:text-slate-200 transition-colors"
            >
              Smart Contract
            </button>
            <button
              onClick={() => setActiveTab('git')}
              className="hover:text-slate-200 transition-colors"
            >
              Git
            </button>
            <button
              onClick={() => setActiveTab('remix')}
              className="hover:text-slate-200 transition-colors"
            >
              Remix
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className="hover:text-slate-200 transition-colors"
            >
              Wallets
            </button>
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              Checklist
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
