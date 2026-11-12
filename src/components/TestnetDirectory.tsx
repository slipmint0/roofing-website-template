import React, { useState } from 'react';
import { TESTNETS } from '../data/testnets';
import { TestnetNetwork } from '../types/token';
import {
  ExternalLink,
  Copy,
  Check,
  Globe,
  Droplet,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const TestnetDirectory: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<TestnetNetwork>(TESTNETS[0]);
  const [copiedRpc, setCopiedRpc] = useState<string | null>(null);
  const [addStatus, setAddStatus] = useState<string | null>(null);

  const copyRpc = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedRpc(url);
    setTimeout(() => setCopiedRpc(null), 2000);
  };

  const handleAddNetworkToMetaMask = async (network: TestnetNetwork) => {
    const ethereum = (window as unknown as { ethereum?: { request: (args: unknown) => Promise<unknown> } }).ethereum;

    if (!ethereum) {
      setAddStatus('MetaMask extension was not detected in your browser.');
      setTimeout(() => setAddStatus(null), 4000);
      return;
    }

    try {
      setAddStatus('Requesting network addition in MetaMask...');
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: network.hexChainId,
            chainName: network.name,
            nativeCurrency: network.nativeCurrency,
            rpcUrls: network.rpcUrls,
            blockExplorerUrls: network.blockExplorerUrls,
          },
        ],
      });
      setAddStatus(`Successfully connected to ${network.name}!`);
      setTimeout(() => setAddStatus(null), 4000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setAddStatus(error.message || 'Failed to add network to MetaMask.');
      setTimeout(() => setAddStatus(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Module 05</span>
          <span aria-hidden="true">·</span>
          <span>EVM Networks</span>
          <span aria-hidden="true">·</span>
          <span>Verified RPC Endpoints</span>
          <span aria-hidden="true">·</span>
          <span>Free Gas Faucets</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          EVM Testnet Directory & Faucet Hub
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Authoritative network configurations, Chain IDs, RPC endpoints, and free verified testnet faucets for educational smart contract deployments.
        </p>
      </div>

      {addStatus && (
        <div className="p-3.5 bg-indigo-950/60 border border-indigo-700/50 rounded-xl text-xs text-indigo-200 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{addStatus}</span>
        </div>
      )}

      {/* Network Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {TESTNETS.map((net) => {
          const isSelected = selectedNetwork.chainId === net.chainId;
          return (
            <button
              key={net.chainId}
              onClick={() => setSelectedNetwork(net)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                  : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-indigo-400">ID: {net.chainId}</span>
                {net.isRecommended && (
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Default</span>
                )}
              </div>
              <div className="text-sm font-semibold text-white truncate">{net.name}</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                Gas: {net.nativeCurrency.symbol}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Network Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Network Parameters */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Network Configuration
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {selectedNetwork.name}
              </h2>
            </div>
            <button
              onClick={() => handleAddNetworkToMetaMask(selectedNetwork)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add to MetaMask</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Decimal Chain ID:</span>
              <div className="text-white font-mono font-semibold text-sm tabular-nums">
                {selectedNetwork.chainId}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Hex Chain ID:</span>
              <div className="text-white font-mono font-semibold text-sm">
                {selectedNetwork.hexChainId}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Native Gas Currency:</span>
              <div className="text-white font-mono font-semibold text-sm">
                {selectedNetwork.nativeCurrency.name} ({selectedNetwork.nativeCurrency.symbol})
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Block Explorer:</span>
              <div>
                <a
                  href={selectedNetwork.blockExplorerUrls[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline font-mono text-xs flex items-center gap-1 truncate"
                >
                  <span>{selectedNetwork.blockExplorerUrls[0].replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-300">Public RPC Endpoints:</div>
            <div className="space-y-2">
              {selectedNetwork.rpcUrls.map((rpc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-300 truncate">{rpc}</span>
                  <button
                    onClick={() => copyRpc(rpc)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md transition-colors shrink-0"
                    title="Copy RPC URL"
                  >
                    {copiedRpc === rpc ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faucet Hub for this Network */}
        <div className="lg:col-span-5 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-md">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Droplet className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Free Verified Testnet Faucets
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Faucets dispense free testnet tokens so developers can pay gas fees for deploying smart contracts and executing transactions without spending real currency.
          </p>

          <div className="space-y-3">
            {selectedNetwork.faucetUrls.map((faucet, idx) => (
              <a
                key={idx}
                href={faucet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-600/50 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  <span>{faucet.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {faucet.note}
                </div>
              </a>
            ))}
          </div>

          <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1.5">
            <div className="text-slate-300 font-medium">Faucet Tips:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>If one faucet is dry or under maintenance, try an alternative faucet from the list above.</li>
              <li>Proof-of-Work (PoW) faucets allow you to mine testnet ETH using spare CPU power without requiring social logins.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
