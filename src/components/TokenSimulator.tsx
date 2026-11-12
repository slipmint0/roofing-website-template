import React, { useState } from 'react';
import { TokenConfig } from '../types/token';
import {
  Activity,
  Send,
  KeyRound,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Flame,
  PlusCircle,
  Clock
} from 'lucide-react';

interface TokenSimulatorProps {
  config: TokenConfig;
}

interface SimulatedEvent {
  id: string;
  type: 'Transfer' | 'Approval' | 'Mint' | 'Burn';
  details: string;
  timestamp: string;
}

export const TokenSimulator: React.FC<TokenSimulatorProps> = ({ config }) => {
  const initialSupplyNum = parseInt(config.initialSupply.replace(/,/g, ''), 10) || 1000000;

  const [balances, setBalances] = useState<{ [address: string]: number }>({
    '0xDeployer (You)': initialSupplyNum,
    '0xAlice': 0,
    '0xBob': 0,
  });

  const [allowances, setAllowances] = useState<{ [key: string]: number }>({
    '0xDeployer (You)->0xAlice': 0,
    '0xDeployer (You)->0xBob': 0,
  });

  const [events, setEvents] = useState<SimulatedEvent[]>([
    {
      id: 'init-1',
      type: 'Transfer',
      details: `0x00000...00000 → 0xDeployer (${initialSupplyNum.toLocaleString()} ${config.symbol}) [Initial Mint]`,
      timestamp: 'Genesis',
    },
  ]);

  // Form states
  const [transferRecipient, setTransferRecipient] = useState<'0xAlice' | '0xBob'>('0xAlice');
  const [transferAmount, setTransferAmount] = useState<string>('5000');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [approveSpender, setApproveSpender] = useState<'0xAlice' | '0xBob'>('0xAlice');
  const [approveAmount, setApproveAmount] = useState<string>('10000');

  const [mintAmount, setMintAmount] = useState<string>('50000');
  const [burnAmount, setBurnAmount] = useState<string>('1000');

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(transferAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      showStatus('error', 'Please enter a valid positive number.');
      return;
    }

    const deployerBal = balances['0xDeployer (You)'] || 0;
    if (deployerBal < amount) {
      showStatus('error', `Insufficient balance. You only have ${deployerBal.toLocaleString()} ${config.symbol}.`);
      return;
    }

    setBalances((prev) => ({
      ...prev,
      '0xDeployer (You)': prev['0xDeployer (You)'] - amount,
      [transferRecipient]: (prev[transferRecipient] || 0) + amount,
    }));

    setEvents((prev) => [
      {
        id: Math.random().toString(),
        type: 'Transfer',
        details: `0xDeployer → ${transferRecipient}: ${amount.toLocaleString()} ${config.symbol}`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    showStatus('success', `Successfully transferred ${amount.toLocaleString()} ${config.symbol} to ${transferRecipient}!`);
  };

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(approveAmount, 10);
    if (isNaN(amount) || amount < 0) {
      showStatus('error', 'Please enter a valid non-negative amount.');
      return;
    }

    const key = `0xDeployer (You)->${approveSpender}`;
    setAllowances((prev) => ({ ...prev, [key]: amount }));

    setEvents((prev) => [
      {
        id: Math.random().toString(),
        type: 'Approval',
        details: `0xDeployer approved ${approveSpender} to spend ${amount.toLocaleString()} ${config.symbol}`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    showStatus('success', `Approved ${approveSpender} for ${amount.toLocaleString()} ${config.symbol}!`);
  };

  const handleMint = () => {
    const amount = parseInt(mintAmount, 10);
    if (isNaN(amount) || amount <= 0) return;

    setBalances((prev) => ({
      ...prev,
      '0xDeployer (You)': prev['0xDeployer (You)'] + amount,
    }));

    setEvents((prev) => [
      {
        id: Math.random().toString(),
        type: 'Mint',
        details: `0x00000... → 0xDeployer: minted ${amount.toLocaleString()} ${config.symbol}`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    showStatus('success', `Minted ${amount.toLocaleString()} new ${config.symbol} tokens.`);
  };

  const handleBurn = () => {
    const amount = parseInt(burnAmount, 10);
    if (isNaN(amount) || amount <= 0) return;

    if (balances['0xDeployer (You)'] < amount) {
      showStatus('error', 'Insufficient balance to burn.');
      return;
    }

    setBalances((prev) => ({
      ...prev,
      '0xDeployer (You)': prev['0xDeployer (You)'] - amount,
    }));

    setEvents((prev) => [
      {
        id: Math.random().toString(),
        type: 'Burn',
        details: `0xDeployer → 0x00000...: burned ${amount.toLocaleString()} ${config.symbol}`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    showStatus('success', `Permanently burned ${amount.toLocaleString()} ${config.symbol} tokens.`);
  };

  const handleReset = () => {
    setBalances({
      '0xDeployer (You)': initialSupplyNum,
      '0xAlice': 0,
      '0xBob': 0,
    });
    setAllowances({
      '0xDeployer (You)->0xAlice': 0,
      '0xDeployer (You)->0xBob': 0,
    });
    setEvents([
      {
        id: 'reset-1',
        type: 'Transfer',
        details: `0x00000... → 0xDeployer (${initialSupplyNum.toLocaleString()} ${config.symbol}) [State Reset]`,
        timestamp: 'Reset',
      },
    ]);
  };

  const currentTotalSupply = Object.values(balances).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Interactive Sandbox</span>
          <span aria-hidden="true">·</span>
          <span>EVM State Machine</span>
          <span aria-hidden="true">·</span>
          <span>Standard Function Execution</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          ERC-20 State Machine & Interaction Simulator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Experience how smart contract state changes, balances, approvals, and events behave on-chain before writing a single transaction to the Sepolia testnet.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-700/50 text-emerald-200'
              : 'bg-red-950/60 border border-red-700/50 text-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Token Name</span>
          <div className="text-sm font-semibold text-white truncate">{config.name}</div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Symbol</span>
          <div className="text-sm font-bold font-mono text-indigo-400">{config.symbol}</div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Total Supply</span>
          <div className="text-sm font-bold font-mono text-white tabular-nums">
            {currentTotalSupply.toLocaleString()} {config.symbol}
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Decimals</span>
            <div className="text-sm font-mono text-white">18</div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            title="Reset simulated balances to initial supply"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive State Execution */}
        <div className="lg:col-span-7 space-y-6">
          {/* Transfer Form */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Send className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                Execute transfer(address to, uint256 amount)
              </h2>
            </div>

            <form onSubmit={handleTransfer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Recipient Address (to)</label>
                  <select
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value as '0xAlice' | '0xBob')}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs"
                  >
                    <option value="0xAlice">0xAlice (Test Account)</option>
                    <option value="0xBob">0xBob (Test Account)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount ({config.symbol})</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs tabular-nums"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate transfer() Transaction</span>
              </button>
            </form>
          </div>

          {/* Approve & Allowance Form */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <KeyRound className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                Execute approve(address spender, uint256 value)
              </h2>
            </div>

            <form onSubmit={handleApprove} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Spender Contract/Account</label>
                  <select
                    value={approveSpender}
                    onChange={(e) => setApproveSpender(e.target.value as '0xAlice' | '0xBob')}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs"
                  >
                    <option value="0xAlice">0xAlice (e.g. DEX Router / Staking)</option>
                    <option value="0xBob">0xBob (e.g. Escrow)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Allowance Amount ({config.symbol})</label>
                  <input
                    type="number"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs tabular-nums"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                <span>Simulate approve() Transaction</span>
              </button>
            </form>
          </div>

          {/* Optional Mint / Burn actions if enabled */}
          {(config.isMintable || config.isBurnable) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.isMintable && (
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <PlusCircle className="w-4 h-4 text-emerald-400" />
                    <span>mint(address, uint256)</span>
                  </div>
                  <input
                    type="number"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs tabular-nums"
                  />
                  <button
                    onClick={handleMint}
                    className="w-full py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors"
                  >
                    Mint to Deployer
                  </button>
                </div>
              )}

              {config.isBurnable && (
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Flame className="w-4 h-4 text-red-400" />
                    <span>burn(uint256)</span>
                  </div>
                  <input
                    type="number"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-xs tabular-nums"
                  />
                  <button
                    onClick={handleBurn}
                    className="w-full py-1.5 text-xs font-medium text-white bg-red-800 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Burn from Deployer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Live Ledger & Event Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated Balance Sheet */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Simulated Balances (mapping(address =&gt; uint256))
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {Object.entries(balances).map(([addr, bal]) => (
                <div
                  key={addr}
                  className="flex items-center justify-between p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono"
                >
                  <span className="text-slate-300 text-[11px] truncate">{addr}</span>
                  <span className="font-bold text-white tabular-nums">
                    {bal.toLocaleString()} <span className="text-indigo-400 text-[10px]">{config.symbol}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Allowances Active:</span>
              <div className="mt-1 space-y-1 font-mono text-[10px] text-slate-400">
                {Object.entries(allowances).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}:</span>
                    <span className="text-amber-400">{v.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Log Feed */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                EVM Event Logs (Transfer &amp; Approval)
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="text-emerald-400 font-semibold">{evt.type}</span>
                    <span>{evt.timestamp}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] break-all">
                    {evt.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
