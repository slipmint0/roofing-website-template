import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenChecklist }) => {
  const navItems = [
    { id: 'contract', label: 'Smart Contract' },
    { id: 'git', label: 'Git & GitHub' },
    { id: 'remix', label: 'Remix Deploy' },
    { id: 'wallet', label: 'Wallet Import' },
    { id: 'testnets', label: 'Testnets & Faucets' },
    { id: 'simulator', label: 'Token Simulator' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('contract')}
            className="flex items-center gap-2.5 text-left text-white hover:text-indigo-400 transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-base font-semibold tracking-tight whitespace-nowrap">
              EVM Testnet Token Lab
            </span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                    isActive
                      ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenChecklist}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-indigo-950"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Deployment Checklist</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center gap-3 overflow-x-auto py-2.5 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-600/30 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
