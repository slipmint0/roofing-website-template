import React, { useState } from 'react';
import {
  Wallet,
  Smartphone,
  Laptop,
  CheckCircle2,
  Copy,
  Check,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TokenConfig } from '../types/token';

interface WalletImportGuideProps {
  config: TokenConfig;
}

export const WalletImportGuide: React.FC<WalletImportGuideProps> = ({ config }) => {
  const [selectedWallet, setSelectedWallet] = useState<'metamask' | 'trustwallet'>('metamask');
  const [demoAddress, setDemoAddress] = useState<string>('0x71C87050fA792730C475612fD8002F8745E56c24');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const cleanSupply = config.initialSupply.replace(/,/g, '');

  const copyAddress = () => {
    navigator.clipboard.writeText(demoAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Module 04</span>
          <span aria-hidden="true">·</span>
          <span>Wallet Integration</span>
          <span aria-hidden="true">·</span>
          <span>ERC-20 RPC Calls</span>
          <span aria-hidden="true">·</span>
          <span>EIP-747 Asset Watch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Importing Custom Token to MetaMask & Trust Wallet
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Step-by-step instructions for adding your newly deployed contract address to your personal EVM wallet to track token balances, transfer tokens, and test decentralized interactions.
        </p>
      </div>

      {/* Wallet Switcher Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedWallet('metamask')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            selectedWallet === 'metamask'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <div className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">M</div>
          <span>MetaMask (Browser & Mobile)</span>
        </button>

        <button
          onClick={() => setSelectedWallet('trustwallet')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            selectedWallet === 'trustwallet'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">T</div>
          <span>Trust Wallet (Mobile iOS & Android)</span>
        </button>
      </div>

      {/* Interactive Walkthrough Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step-by-Step Instructions */}
        <div className="lg:col-span-7 space-y-4">
          {selectedWallet === 'metamask' ? (
            <div className="space-y-4">
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Laptop className="w-4 h-4" />
                  <span>MetaMask Import Steps</span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white block mb-0.5">Confirm Network Selection:</strong>
                      Open MetaMask and check the network pill in the top-left corner. Ensure it is set to <strong>Sepolia</strong> (or whichever testnet your contract was deployed to). If on Ethereum Mainnet, your testnet token balance will not be found!
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white block mb-0.5">Navigate to Tokens Tab:</strong>
                      On MetaMask's home screen, click the <strong>"Tokens"</strong> tab (next to NFTs / Activity). Scroll to the bottom of your token list.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white block mb-0.5">Click "Import tokens":</strong>
                      Click the text link at the bottom: <strong>"Import tokens"</strong>. Select the <strong>"Custom token"</strong> tab at the top of the modal.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-white block mb-0.5">Paste Token Contract Address:</strong>
                      Paste your deployed contract address (from Remix) into the <strong>"Token contract address"</strong> field.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
                    <div>
                      <strong className="text-white block mb-0.5">Automatic RPC Detection:</strong>
                      Within 1–2 seconds, MetaMask queries the Sepolia node. <strong>Token symbol ({config.symbol})</strong> and <strong>Token decimal (18)</strong> will fill automatically!
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">6</span>
                    <div>
                      <strong className="text-white block mb-0.5">Add & Import:</strong>
                      Click <strong>"Next" / "Add custom token"</strong>, then click <strong>"Import tokens"</strong>. You will now see your minted balance of <span className="font-mono text-emerald-400">{config.initialSupply} {config.symbol}</span> on your home screen!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Trust Wallet Mobile Steps (iOS & Android)</span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white block mb-0.5">Open Token Filter / Manage:</strong>
                      Open Trust Wallet on your mobile device. In the top right corner of the home balance screen, tap the <strong>Sliders / Filter icon</strong> (or scroll to the bottom and tap "Manage crypto").
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white block mb-0.5">Tap the "+" Add Button:</strong>
                      In the top right corner of the crypto search screen, tap the <strong>"+" (Plus)</strong> symbol to open the "Add Custom Token" interface.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white block mb-0.5">Select Network:</strong>
                      Tap the <strong>Network</strong> row (defaults to Ethereum). Select <strong>Ethereum</strong> or search for <strong>Sepolia Testnet</strong> if testing on a custom EVM network.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-white block mb-0.5">Paste Contract Address:</strong>
                      Tap <strong>"Paste"</strong> next to the Contract Address field.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
                    <div>
                      <strong className="text-white block mb-0.5">Node Auto-Fetch:</strong>
                      Trust Wallet's node will query the contract directly. Name ({config.name}), Symbol ({config.symbol}), and Decimals (18) will populate automatically.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">6</span>
                    <div>
                      <strong className="text-white block mb-0.5">Save / Import:</strong>
                      Tap <strong>"Save"</strong> or <strong>"Import"</strong> at the bottom. Your educational token balance is now live and sendable to other testnet addresses!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Under the Hood Callout */}
          <div className="bg-[#111726] border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>How Wallets Read ERC-20 Tokens Under the Hood</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              When you paste a contract address, your wallet executes standard JSON-RPC <code className="text-indigo-300 font-mono">eth_call</code> methods against the chain:
            </p>
            <div className="font-mono text-[10px] bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300 space-y-1">
              <div>1. eth_call → contract.symbol()    ⇒ "{config.symbol}"</div>
              <div>2. eth_call → contract.decimals()  ⇒ 18</div>
              <div>3. eth_call → contract.balanceOf(yourWallet) ⇒ {cleanSupply}000000000000000000</div>
              <div className="text-indigo-400 pt-1">Wallet display: (raw_balance / 10¹⁸) = {config.initialSupply} {config.symbol}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Mockup & Tester */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b101d] border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Wallet Preview Simulator
              </span>
              <span className="text-[11px] text-indigo-400 font-mono">Sepolia Testnet</span>
            </div>

            {/* Simulated Mobile/Extension Card */}
            <div className="bg-gradient-to-b from-slate-900 to-[#0c1220] border border-slate-700/60 rounded-2xl p-5 space-y-5 shadow-md">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Sepolia Network</span>
                </span>
                <span className="font-mono text-[11px]">Account 1 (0x...394)</span>
              </div>

              <div className="text-center py-4 border-y border-slate-800/80 space-y-1">
                <div className="text-2xl font-bold font-mono text-white tabular-nums tracking-tight">
                  {config.initialSupply} <span className="text-indigo-400">{config.symbol}</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {config.name}
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Testnet Educational Asset · No Fiat Value
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Contract Address:</span>
                  <span className="font-mono text-indigo-300 truncate max-w-[170px] text-[11px]">
                    {demoAddress}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Standard:</span>
                  <span className="font-mono text-slate-300">ERC-20 (OpenZeppelin v5)</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Decimals:</span>
                  <span className="font-mono text-slate-300">18</span>
                </div>
              </div>
            </div>

            {/* Test Contract Address Box */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                Test with your deployed address:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={demoAddress}
                  onChange={(e) => setDemoAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs font-mono"
                />
                <button
                  onClick={copyAddress}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors shrink-0"
                  title="Copy address"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-400 block leading-tight">
                Paste your Remix deployment address here to practice copying it into your personal wallet.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
