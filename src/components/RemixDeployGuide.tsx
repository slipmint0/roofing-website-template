import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Play,
  Cpu,
  Wallet,
  Send,
  Search,
  Check,
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';
import { TokenConfig } from '../types/token';

interface RemixDeployGuideProps {
  config: TokenConfig;
  onProceedToWallet: () => void;
  onGoToFaucets: () => void;
}

export const RemixDeployGuide: React.FC<RemixDeployGuideProps> = ({
  config,
  onProceedToWallet,
  onGoToFaucets,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedContract, setCopiedContract] = useState(false);

  const tokenContractName = (config.name.replace(/[^a-zA-Z0-9]/g, '') || 'EduToken');

  const steps = [
    {
      id: 1,
      name: 'Prerequisites & Faucet Funding',
      icon: Wallet,
      short: 'MetaMask & Sepolia ETH',
    },
    {
      id: 2,
      name: 'Create Contract in Remix',
      icon: Layers,
      short: 'remix.ethereum.org',
    },
    {
      id: 3,
      name: 'Solidity Compiler Setup',
      icon: Cpu,
      short: 'Version 0.8.20+',
    },
    {
      id: 4,
      name: 'Connect Injected Provider',
      icon: Play,
      short: 'Injected MetaMask',
    },
    {
      id: 5,
      name: 'Deploy & Confirm Transaction',
      icon: Send,
      short: 'Confirm on Sepolia',
    },
    {
      id: 6,
      name: 'Inspect on Sepolia Etherscan',
      icon: Search,
      short: 'Grab Contract Address',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Module 03</span>
          <span aria-hidden="true">·</span>
          <span>Remix IDE</span>
          <span aria-hidden="true">·</span>
          <span>MetaMask Injected Provider</span>
          <span aria-hidden="true">·</span>
          <span>Sepolia Testnet</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Deploying Smart Contract via Remix IDE & MetaMask
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Comprehensive walkthrough for compiling standard Solidity code and broadcasting your contract deployment transaction to the Sepolia EVM testnet without manual node infrastructure.
        </p>
      </div>

      {/* Step Navigator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#0d1322] p-1.5 rounded-xl border border-slate-800">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.id;
          const isDone = activeStep > s.id;

          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDone
                  ? 'bg-slate-900/60 text-indigo-300 hover:bg-slate-800/80'
                  : 'text-slate-400 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-mono opacity-80">Step 0{s.id}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                )}
              </div>
              <div className="text-xs font-semibold truncate w-full">{s.short}</div>
            </button>
          );
        })}
      </div>

      {/* Step Content View */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {activeStep === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 1 of 6</span>
                <h2 className="text-xl font-bold text-white mt-1">
                  MetaMask Setup & Sepolia Faucet Funding
                </h2>
              </div>
              <button
                onClick={onGoToFaucets}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-700/50 rounded-lg hover:bg-indigo-900/80 transition-colors"
              >
                <span>View Faucet Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Before deploying to any EVM testnet, your wallet requires a small amount of testnet ETH to pay the Ethereum gas fees for bytecode storage and contract initialization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 font-semibold text-white text-sm">
                  <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono">1</div>
                  <span>Enable Test Networks in MetaMask</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Open MetaMask, tap the network dropdown in the top-left, and ensure <strong>"Show test networks"</strong> is toggled ON. Select <strong>Sepolia</strong>.
                </p>
                <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-slate-400 border border-slate-800">
                  Network: Sepolia · Chain ID: 11155111 · Currency: SepoliaETH
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 font-semibold text-white text-sm">
                  <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono">2</div>
                  <span>Request Free Testnet ETH</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Testnet ETH is 100% free and has zero fiat value. Use the official Google Cloud Web3 Faucet or Alchemy Sepolia Faucet to get ~0.05 SepoliaETH.
                </p>
                <button
                  onClick={onGoToFaucets}
                  className="w-full py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Faucets Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 2 of 6</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Open Remix Ethereum IDE & Create Contract File
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Remix is the official, zero-install Web3 IDE maintained by the Ethereum Foundation. It automatically resolves OpenZeppelin npm dependencies in the background!
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0">1</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Go to <a href="https://remix.ethereum.org" target="_blank" rel="noreferrer" className="text-indigo-400 underline font-medium">https://remix.ethereum.org</a> in your browser (use Chrome, Brave, or Firefox with MetaMask installed).
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0">2</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  In the left sidebar, click the <strong>File Explorer</strong> tab (top icon). Navigate into the <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">contracts/</code> folder.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0">3</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Click the <strong>New File</strong> icon and name your file <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono font-semibold">{tokenContractName}.sol</code>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0">4</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Paste the generated Solidity contract code from Module 01 into the editor.
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl flex items-center gap-2.5 text-xs text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong>Remix Magic:</strong> You do not need to run <code className="font-mono">npm install</code>. Remix automatically fetches the exact OpenZeppelin contract files over HTTPS when compiling!
              </span>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 3 of 6</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Configure Solidity Compiler in Remix
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Ensure the compiler version satisfies your pragma statement (<code className="text-indigo-300 font-mono">pragma solidity ^0.8.20;</code>).
            </p>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Solidity Compiler Tab:</span>
                  <span className="text-white font-medium">Click 3rd icon on the vertical left bar (looks like an S in brackets)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Compiler Version:</span>
                  <span className="text-emerald-400 font-mono font-medium">0.8.20 (or 0.8.24 / 0.8.28)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Language:</span>
                  <span className="text-white font-mono">Solidity</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">EVM Version:</span>
                  <span className="text-white font-mono">default (cancun / shanghai / paris)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  Click the blue button: <strong>"Compile {tokenContractName}.sol"</strong> (or press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">Ctrl+S</kbd> / <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">Cmd+S</kbd>).
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium whitespace-nowrap bg-emerald-950/40 px-3 py-1.5 rounded-md border border-emerald-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Green checkmark appears</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 4 of 6</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Connect MetaMask via Injected Provider
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Switch the deployment environment from the local simulation to your live MetaMask wallet connected to the Sepolia testnet.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white uppercase tracking-wider">
                  Remix 'Deploy & Run Transactions' Tab (4th icon)
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-400">1. ENVIRONMENT:</span>
                    <span className="text-indigo-400 font-semibold font-mono bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-800/50">
                      Injected Provider - MetaMask
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    MetaMask will immediately trigger a popup asking to authorize Remix. Click <strong>Connect</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-400">2. NETWORK DETECTION:</span>
                    <span className="text-emerald-400 font-mono">
                      Custom (11155111) network / Sepolia
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    If Remix says "Mainnet (1)", open MetaMask and switch your network to <strong>Sepolia</strong>!
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-400">3. CONTRACT DROPDOWN:</span>
                    <span className="text-amber-400 font-mono font-semibold">
                      {tokenContractName} - contracts/{tokenContractName}.sol
                    </span>
                  </div>
                  <p className="text-amber-300/80 text-[11px] leading-relaxed">
                    ⚠️ <strong>Common Beginner Mistake:</strong> Do NOT select imported interfaces like <code className="text-slate-300">IERC20</code> or <code className="text-slate-300">Context</code>. Always pick your main token contract!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 5 of 6</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Execute Deployment & Confirm in MetaMask
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Broadcast the contract creation transaction to the Sepolia miners/validators.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white">Constructor Parameters & Deploy Button:</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {config.isMintable || config.isPausable ? (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
                      <div className="text-indigo-400 font-medium">initialOwner (address):</div>
                      <div className="text-slate-400 text-[11px]">
                        Since your contract uses OpenZeppelin 5.0 Ownable, paste your own MetaMask address into the <code className="text-slate-200">initialOwner</code> input field next to the Deploy button.
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
                      No custom constructor arguments required. Initial supply of <strong>{config.initialSupply}</strong> is automatically minted to your deployer address!
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 p-3 bg-amber-950/20 border border-amber-600/30 rounded-lg text-amber-200 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Click the orange <strong>"Deploy"</strong> button in Remix.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white">MetaMask Confirmation Window:</div>
                <div className="text-xs text-slate-400 leading-relaxed space-y-2">
                  <p>
                    1. A MetaMask notification will appear titled <strong>"Contract Deployment"</strong>.
                  </p>
                  <p>
                    2. Check the Estimated Gas fee (e.g. 0.001–0.005 SepoliaETH).
                  </p>
                  <p>
                    3. Click <strong>"Confirm"</strong>. Wait ~12–15 seconds for the transaction to be included in a Sepolia block.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 6 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 6 of 6</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Inspect Deployed Contract & Grab Address
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Your smart contract is now permanently deployed on the Sepolia blockchain testnet!
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white">Locating Contract Address in Remix:</div>
                <div className="text-xs text-slate-400 leading-relaxed space-y-2">
                  <p>
                    1. Look under <strong>"Deployed Contracts"</strong> at the bottom of the Deploy & Run Transactions tab.
                  </p>
                  <p>
                    2. You will see <code className="text-emerald-400 font-mono">{tokenContractName} at 0x...</code>.
                  </p>
                  <p>
                    3. Click the small <strong>Copy icon</strong> next to the contract name to copy your deployed contract address (e.g. <code className="text-slate-300 font-mono">0x71C...394</code>).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white">Verify on Sepolia Etherscan:</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Go to <a href="https://sepolia.etherscan.io" target="_blank" rel="noreferrer" className="text-indigo-400 underline font-medium">https://sepolia.etherscan.io</a> and search for your copied contract address. You will see:
                  <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-[11px]">
                    <li>Contract Creation transaction</li>
                    <li>Token Tracker: <span className="text-indigo-300 font-semibold">{config.name} ({config.symbol})</span></li>
                    <li>Total Supply: <span className="font-mono">{config.initialSupply} {config.symbol}</span></li>
                    <li>Decimals: <span className="font-mono">18</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between p-4 bg-[#0a0f1d] border-t border-slate-800">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeStep === 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
          >
            ← Previous Step
          </button>

          {activeStep < 6 ? (
            <button
              onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={onProceedToWallet}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Import to Wallet Guide →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
