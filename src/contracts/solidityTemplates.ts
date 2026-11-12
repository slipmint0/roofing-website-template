import { TokenConfig } from '../types/token';

export function generateSolidityContract(config: TokenConfig): string {
  const imports: string[] = [
    `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";`,
  ];

  if (config.isBurnable) {
    imports.push(`import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";`);
  }
  if (config.isPausable) {
    imports.push(`import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";`);
  }
  if (config.isCapped) {
    imports.push(`import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";`);
  }
  if (config.isMintable || config.isPausable) {
    imports.push(`import "@openzeppelin/contracts/access/Ownable.sol";`);
  }

  const inheritanceList: string[] = ['ERC20'];
  if (config.isBurnable) inheritanceList.push('ERC20Burnable');
  if (config.isPausable) inheritanceList.push('ERC20Pausable');
  if (config.isCapped) inheritanceList.push('ERC20Capped');
  if (config.isMintable || config.isPausable) inheritanceList.push('Ownable');

  const inheritanceString = inheritanceList.join(', ');

  const className = config.name.replace(/[^a-zA-Z0-9]/g, '') || 'SampleToken';

  // Constructor parameters
  const superConstructors: string[] = [`ERC20("${config.name}", "${config.symbol}")`];

  if (config.isCapped) {
    const capValue = config.capSupply || '2000000';
    superConstructors.push(`ERC20Capped(${capValue} * (10 ** decimals()))`);
  }

  if (config.isMintable || config.isPausable) {
    superConstructors.push(`Ownable(initialOwner)`);
  }

  let constructorSignature = 'constructor(';
  if (config.isMintable || config.isPausable) {
    constructorSignature += 'address initialOwner';
  }
  constructorSignature += ')';

  // Calculate clean initial supply mint
  const cleanSupply = config.initialSupply.replace(/,/g, '').trim() || '1000000';

  let customOverrides = '';
  if (config.isPausable || config.isCapped) {
    // OpenZeppelin v5 uses _update instead of _beforeTokenTransfer
    const overrideList: string[] = ['ERC20'];
    if (config.isPausable) overrideList.push('ERC20Pausable');
    if (config.isCapped) overrideList.push('ERC20Capped');

    customOverrides = `
    // The following functions are overrides required by Solidity for standard OpenZeppelin extensions.
    function _update(address from, address to, uint256 value)
        internal
        override(${overrideList.join(', ')})
    {
        super._update(from, to, value);
    }`;
  }

  let pauseFunctions = '';
  if (config.isPausable) {
    pauseFunctions = `
    /**
     * @dev Pauses all token transfers. Callable strictly by the contract owner.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers. Callable strictly by the contract owner.
     */
    function unpause() public onlyOwner {
        _unpause();
    }
`;
  }

  let mintFunction = '';
  if (config.isMintable) {
    mintFunction = `
    /**
     * @dev Creates \`amount\` tokens and assigns them to \`to\`, increasing total supply.
     * Accessible only by the contract owner.
     * Note: Respects cap if capped extension is active.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
`;
  }

  return `// SPDX-License-Identifier: ${config.license || 'MIT'}
pragma solidity ^${config.solidityVersion || '0.8.20'};

/**
 * @title ${config.name} (${config.symbol})
 * @dev Standard ERC-20 Token implementation using verified OpenZeppelin Contracts v5.x.
 * Designed for educational testnet deployment (Sepolia, Holesky, Polygon Amoy, etc.).
 * Fully compliant with the Ethereum ERC-20 token standard specification (EIP-20).
 */
${imports.join('\n')}

contract ${className} is ${inheritanceString} {
    /**
     * @notice Deployer configures token metadata and mints initial educational supply.
     ${config.isMintable || config.isPausable ? '* @param initialOwner Address designated as the contract administrator (usually deployer msg.sender).' : ''}
     */
    ${constructorSignature}
        ${superConstructors.join('\n        ')}
    {
        // Initial token supply minted to the deployer's address (${cleanSupply} tokens with 18 decimals)
        _mint(msg.sender, ${cleanSupply} * (10 ** decimals()));
    }
${mintFunction}${pauseFunctions}${customOverrides}
}
`;
}

export const SAMPLE_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  }
];
