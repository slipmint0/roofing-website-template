import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface DeployChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployChecklistModal: React.FC<DeployChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({});

  if (!isOpen) return null;

  const checklist = [
    {
      id: 'faucet',
      category: '1. Wallet & Gas Preparation',
      title: 'MetaMask is set to Sepolia Testnet with >= 0.02 SepoliaETH for gas',
      tip: 'Get free gas tokens from the Google Cloud Web3 or Alchemy Sepolia Faucet.',
    },
    {
      id: 'security_git',
      category: '2. Security & Git Discipline',
      title: '.gitignore created with .env, keystores, and secrets excluded',
      tip: 'Never commit raw private keys or seed phrases to public GitHub repositories.',
    },
    {
      id: 'compiler_version',
      category: '3. Remix IDE Compiler',
      title: 'Solidity Compiler version matches pragma (^0.8.20) with green checkmark',
      tip: 'OpenZeppelin v5 requires Solidity 0.8.20 or newer.',
    },
    {
      id: 'injected_provider',
      category: '4. Deployment Environment',
      title: 'Environment set to "Injected Provider - MetaMask" (Chain ID 11155111 detected)',
      tip: 'Do not deploy to Remix VM if you want to inspect on Sepolia Etherscan and view in Trust Wallet.',
    },
    {
      id: 'contract_select',
      category: '5. Contract Dropdown',
      title: 'Selected custom Token contract from the dropdown (NOT imported interfaces)',
      tip: 'Avoid deploying Context.sol or IERC20.sol by mistake.',
    },
    {
      id: 'constructor_args',
      category: '6. Constructor Arguments',
      title: 'Supplied initialOwner address if using OpenZeppelin 5.0 Ownable',
      tip: 'Paste your own MetaMask address as the initial administrator.',
    },
    {
      id: 'record_address',
      category: '7. Post-Deployment',
      title: 'Copied deployed contract address (0x...) and verified on Sepolia Etherscan',
      tip: 'Save this address to import into MetaMask and Trust Wallet.',
    },
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#121c33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">EVM Deployment Readiness Checklist</h2>
              <div className="text-xs text-slate-400">Verify all 7 standard production-grade milestones</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between gap-4 text-xs">
          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="font-mono text-indigo-300 font-semibold tabular-nums shrink-0">
            {completedCount} / {checklist.length} ({progressPercent}%)
          </span>
        </div>

        {/* Checklist Items */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-indigo-950/30 border-indigo-500/40 text-slate-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 shrink-0"
                />
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                    {item.category}
                  </div>
                  <div className={`text-xs font-medium leading-snug ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">
                    {item.tip}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f1d] border-t border-slate-800">
          <button
            onClick={() => setCheckedItems({})}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Clear Checks
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
