import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  FolderGit2,
  ShieldAlert,
  GitBranch,
  ArrowRight,
  Github
} from 'lucide-react';
import { TokenConfig } from '../types/token';

interface GitGuideProps {
  config: TokenConfig;
  onProceedToRemix: () => void;
}

export const GitGuide: React.FC<GitGuideProps> = ({ config, onProceedToRemix }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const tokenContractName = (config.name.replace(/[^a-zA-Z0-9]/g, '') || 'EduToken') + '.sol';

  const gitSteps = [
    {
      title: '1. Create Directory & Initialize Git Repository',
      description: 'Set up an isolated workspace for your smart contract project and create a new local Git repository.',
      command: `mkdir my-testnet-token
cd my-testnet-token
git init`,
    },
    {
      title: '2. Create Essential .gitignore File',
      description: 'Vital security step: Prevent accidental leaks of private keys, .env secrets, compiler cache, and dependencies.',
      command: `cat << 'EOF' > .gitignore
# Environment variables & secrets (NEVER COMMIT PRIVATE KEYS)
.env
.env.local
*.secret
keystore/

# Node dependencies
node_modules/
package-lock.json

# Hardhat & Foundry build artifacts
cache/
artifacts/
out/
broadcast/

# Operating system files
.DS_Store
Thumbs.db
EOF`,
    },
    {
      title: '3. Create Project Structure & Save Smart Contract',
      description: `Create a standard 'contracts' folder and write your OpenZeppelin contract file '${tokenContractName}'.`,
      command: `mkdir -p contracts
# Save the Solidity code generated in Step 1 into contracts/${tokenContractName}
touch contracts/${tokenContractName}

# Create a clear README documentation file
cat << 'EOF' > README.md
# ${config.name} (${config.symbol})

Educational ERC-20 token smart contract built with OpenZeppelin Contracts v5.x for EVM testnet deployment.

## Specifications
- **Standard**: ERC-20 (EIP-20)
- **Decimals**: 18
- **Initial Supply**: ${config.initialSupply} ${config.symbol}
- **Solidity Version**: ^${config.solidityVersion}
EOF`,
    },
    {
      title: '4. Stage Files and Make Initial Commit',
      description: 'Add your contract, documentation, and .gitignore file to Git staging and commit with a standard semantic message.',
      command: `git add .
git status
git commit -m "feat(contracts): add ${config.symbol} ERC-20 token using OpenZeppelin v5"`,
    },
    {
      title: '5. Create Remote Repository on GitHub',
      description: 'Navigate to https://github.com/new and create a new public or private repository named "my-testnet-token" (do NOT check initialize with README).',
      command: `# Alternatively, if you have the GitHub CLI installed:
gh repo create my-testnet-token --public --source=. --remote=origin`,
    },
    {
      title: '6. Set Main Branch, Link Remote, and Push',
      description: 'Standardize branch name to "main", attach your GitHub remote URL, and push your code.',
      command: `git branch -M main
# Replace YOUR_USERNAME with your GitHub username:
git remote add origin https://github.com/YOUR_USERNAME/my-testnet-token.git
git push -u origin main`,
    },
  ];

  const fullScript = gitSteps.map((s) => `# ${s.title}\n${s.command}\n`).join('\n');

  const copyStep = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(fullScript);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Module 02</span>
          <span aria-hidden="true">·</span>
          <span>Version Control</span>
          <span aria-hidden="true">·</span>
          <span>Git & GitHub CLI</span>
          <span aria-hidden="true">·</span>
          <span>Security Hardening</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Git Repository Initialization & GitHub Setup
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Standard developer workflow for tracking contract revisions, isolating secret environments, and pushing your smart contract code to GitHub before compiling and deploying.
        </p>
      </div>

      {/* Critical Security Box */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 text-xs text-amber-200">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 leading-relaxed">
            <div className="font-semibold text-amber-300 text-sm">
              Blockchain Security Rule: Never Commit Private Keys or Mnemonic Phrases
            </div>
            <p className="text-amber-200/90 text-xs">
              Automated scraping bots monitor GitHub commits 24/7. Never put raw private keys, testnet deployer seeds, or paid RPC API keys into code files. Always keep them in an ignored <code className="bg-amber-950/80 px-1.5 py-0.5 rounded text-amber-300 font-mono">.env</code> file or use web wallet injection (MetaMask).
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Strip */}
      <div className="flex items-center justify-between gap-4 p-4 bg-[#111726] border border-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Full Automated Setup Script</div>
            <div className="text-[11px] text-slate-400">Run the entire sequence in your bash or zsh terminal in one shot.</div>
          </div>
        </div>

        <button
          onClick={copyAll}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied All Commands</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Script</span>
            </>
          )}
        </button>
      </div>

      {/* Step by Step Commands */}
      <div className="space-y-5">
        {gitSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0e1424] border border-slate-800 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#121a2d]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-semibold font-mono">
                    0{idx + 1}
                  </span>
                  <h2 className="text-sm font-semibold text-white">
                    {step.title}
                  </h2>
                </div>
                <button
                  onClick={() => copyStep(step.command, idx)}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-md transition-colors border border-slate-700/60"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Command</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="p-4 bg-[#080d1a] overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                <code>{step.command}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Next Step Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#111726] border border-slate-800 rounded-xl">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white">Ready to Deploy on Sepolia Testnet?</div>
          <div className="text-xs text-slate-400">Compile your smart contract in Remix IDE and deploy using MetaMask.</div>
        </div>
        <button
          onClick={onProceedToRemix}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-950"
        >
          <span>Proceed to Remix Deployment Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
