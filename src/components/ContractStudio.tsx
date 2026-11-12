import React, { useState } from 'react';
import { TokenConfig } from '../types/token';
import { generateSolidityContract, SAMPLE_ABI } from '../contracts/solidityTemplates';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  Shield,
  FileCode,
  Sliders,
  Info,
  CheckCircle2,
  Code2
} from 'lucide-react';

interface ContractStudioProps {
  config: TokenConfig;
  setConfig: React.Dispatch<React.SetStateAction<TokenConfig>>;
  onGoToRemix: () => void;
}

export const ContractStudio: React.FC<ContractStudioProps> = ({
  config,
  setConfig,
  onGoToRemix,
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'contract' | 'analysis' | 'abi' | 'interface'>('contract');
  const [copied, setCopied] = useState(false);

  const solidityCode = generateSolidityContract(config);

  const handleCopy = () => {
    navigator.clipboard.writeText(solidityCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([solidityCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    const cleanFileName = (config.name.replace(/[^a-zA-Z0-9]/g, '') || 'Token') + '.sol';
    element.download = cleanFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleOpenRemix = () => {
    // Remix supports opening directly or copying
    window.open('https://remix.ethereum.org', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Module 01</span>
          <span aria-hidden="true">·</span>
          <span>Solidity ^0.8.20</span>
          <span aria-hidden="true">·</span>
          <span>OpenZeppelin v5.0</span>
          <span aria-hidden="true">·</span>
          <span>EIP-20 Standard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Secure ERC-20 Token Smart Contract
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Configure, inspect, and generate an audited OpenZeppelin ERC-20 smart contract for educational deployment on EVM testnets. Includes battle-tested ownership controls and standard decimal precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Parameter Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111726] border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
                Token Parameters
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Token Name
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="e.g. SepoliaEduToken"
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Full readable name (e.g. Ethereum Sepolia)</span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Token Symbol (Ticker)
                </label>
                <input
                  type="text"
                  value={config.symbol}
                  onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
                  placeholder="e.g. SET"
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono font-medium"
                  maxLength={8}
                />
                <span className="text-[11px] text-slate-500 mt-1 block">3–5 character ticker symbol</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                    <span>Decimals</span>
                    <span className="text-[10px] text-indigo-400">Standard</span>
                  </label>
                  <input
                    type="number"
                    value={config.decimals}
                    disabled
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-400 cursor-not-allowed font-mono tabular-nums"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">18 (10¹⁸ wei standard)</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Initial Supply
                  </label>
                  <input
                    type="text"
                    value={config.initialSupply}
                    onChange={(e) => setConfig({ ...config, initialSupply: e.target.value })}
                    placeholder="1000000"
                    className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-mono tabular-nums"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Minted to deployer</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <label className="block text-slate-300 font-medium mb-2">
                  OpenZeppelin Extensions
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={config.isBurnable}
                      onChange={(e) => setConfig({ ...config, isBurnable: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                    />
                    <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-300 transition-colors">
                        Burnable (ERC20Burnable)
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        Allows token holders to irreversibly destroy their tokens.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={config.isMintable}
                      onChange={(e) => setConfig({ ...config, isMintable: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                    />
                    <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-300 transition-colors">
                        Mintable (Ownable + mint)
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        Allows contract owner to mint additional test tokens.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={config.isPausable}
                      onChange={(e) => setConfig({ ...config, isPausable: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                    />
                    <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-300 transition-colors">
                        Pausable (ERC20Pausable)
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        Owner emergency stop trigger to pause all transfers.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={config.isCapped}
                      onChange={(e) => setConfig({ ...config, isCapped: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                    />
                    <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-300 transition-colors">
                        Capped Supply (ERC20Capped)
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        Enforces mathematical hard ceiling on total supply.
                      </div>
                    </div>
                  </label>
                </div>

                {config.isCapped && (
                  <div className="mt-3 pl-6">
                    <label className="block text-slate-400 text-[11px] mb-1">
                      Cap Limit Total Supply
                    </label>
                    <input
                      type="text"
                      value={config.capSupply}
                      onChange={(e) => setConfig({ ...config, capSupply: e.target.value })}
                      placeholder="2000000"
                      className="w-full px-2.5 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs tabular-nums"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Standards & Security Brief */}
          <div className="bg-[#111726]/60 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Standard Development Invariants</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Strict OpenZeppelin v5.0 inheritance without modified core bytecode.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero hidden honeypot logic, transfer tax hooks, or blacklists.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pure EVM accounting: testnet tokens carry zero monetary value.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Code Viewer & Tabs */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0b101c] border border-slate-800 rounded-xl overflow-hidden shadow-md">
            {/* Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0f1627] border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveCodeTab('contract')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCodeTab === 'contract'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{config.name.replace(/[^a-zA-Z0-9]/g, '') || 'Token'}.sol</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveCodeTab('analysis')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCodeTab === 'analysis'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Architecture & Security</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveCodeTab('abi')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCodeTab === 'abi'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Contract ABI</span>
                  </span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60"
                  title="Copy contract source code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60"
                  title="Download .sol file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .sol</span>
                </button>

                <button
                  onClick={handleOpenRemix}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  title="Open Remix IDE in a new tab"
                >
                  <span>Open in Remix</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {activeCodeTab === 'contract' && (
              <div className="relative">
                <pre className="p-4 overflow-x-auto text-xs text-slate-200 font-mono leading-relaxed max-h-[580px] bg-[#070b14]">
                  <code>{solidityCode}</code>
                </pre>
              </div>
            )}

            {activeCodeTab === 'analysis' && (
              <div className="p-6 text-xs text-slate-300 space-y-6 max-h-[580px] overflow-y-auto bg-[#070b14]">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    1. Why OpenZeppelin Contracts?
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-3">
                    OpenZeppelin is the gold standard in smart contract security. Rolling custom token logic from scratch often introduces vulnerabilities such as reentrancy bugs, integer overflows, or malformed event emissions. OpenZeppelin contracts undergo continuous independent third-party audits and adhere strictly to EIP-20.
                  </p>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1.5 text-slate-300 font-mono text-[11px]">
                    <div>import "@openzeppelin/contracts/token/ERC20/ERC20.sol";</div>
                    <div className="text-slate-500">// Automatically provides standard functions: totalSupply, balanceOf, transfer, approve, transferFrom</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    2. Understanding 18 Decimals (`10 ** 18`)
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-2">
                    EVM smart contracts cannot store floating point fractions (e.g. `1.5` tokens). To represent fractions, tokens use fixed-point arithmetic with a <code className="text-indigo-300">decimals</code> value, standardizing at 18 decimals (just like Ether has 10¹⁸ Wei).
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    When we mint <strong>{config.initialSupply}</strong> tokens, the EVM stores:
                  </p>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-emerald-400 font-mono text-[11px] tabular-nums mt-1">
                    {config.initialSupply.replace(/,/g, '')}000000000000000000 (with 18 decimal zeros)
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    3. Constructor & Ownership Initialization (OpenZeppelin 5.x)
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    In OpenZeppelin v5.0, <code className="text-indigo-300">Ownable</code> explicitly requires passing the initial owner address to the constructor: <code className="text-indigo-300">Ownable(initialOwner)</code>. This eliminates ambiguity and prevents front-running initialization attacks.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    4. Zero Honeypots & Zero False Fiat Backdoors
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    This implementation contains no arbitrary transfer fees, no hidden address blacklists, and no malicious sell restrictions. Every transfer is 1-to-1 via <code className="text-indigo-300">_update(from, to, value)</code>, guaranteeing true ERC-20 compliance and safe educational deployment.
                  </p>
                </div>
              </div>
            )}

            {activeCodeTab === 'abi' && (
              <div className="p-4 text-xs font-mono text-slate-300 bg-[#070b14] max-h-[580px] overflow-y-auto">
                <div className="text-slate-400 mb-3 text-[11px] font-sans">
                  The Application Binary Interface (ABI) is the standard JSON representation used by Web3 frontends (e.g. Ethers.js, Viem, Web3.js) and block explorers to encode and decode calls to your smart contract.
                </div>
                <pre className="text-[11px] text-indigo-300/90 leading-relaxed">
                  {JSON.stringify(SAMPLE_ABI, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Quick Step Guide Link */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#111726] border border-slate-800 rounded-xl">
            <div>
              <div className="text-xs font-semibold text-white">Next Step: Git Version Control</div>
              <div className="text-[11px] text-slate-400">Initialize a repository and save your contract code to GitHub before deployment.</div>
            </div>
            <button
              onClick={onGoToRemix}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Continue to Git Guide →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
