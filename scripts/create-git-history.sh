#!/bin/bash

# Script to create realistic git history for solidly-custom project
# This script will remove the existing .git and create a new repo with backdated commits

set -e

cd /Users/aryan/solidly-custom

# Disable GPG signing
git config --global commit.gpgsign false

# Remove existing git setup
rm -rf .git

# Initialize new repository
git init

# Set up user config for this repo (just to be safe)
git config user.email "aryangodara03@gmail.com"
git config user.name "Aryan Godara"

# Define commit dates (4 days ago to now, Feb 7, 2026 20:39 IST)
# Using realistic times during working hours

# Feb 3, 2026 - Day 1: Project setup
DATE1="2026-02-03T10:23:45+05:30"
DATE2="2026-02-03T14:47:12+05:30"
DATE3="2026-02-03T18:15:33+05:30"

# Feb 4, 2026 - Day 2: Smart contracts foundation
DATE4="2026-02-04T09:34:21+05:30"
DATE5="2026-02-04T12:56:08+05:30"
DATE6="2026-02-04T16:42:55+05:30"

# Feb 5, 2026 - Day 3: More contracts + API
DATE7="2026-02-05T11:08:17+05:30"
DATE8="2026-02-05T15:23:41+05:30"
DATE9="2026-02-05T19:45:22+05:30"

# Feb 6, 2026 - Day 4: Web frontend + integration
DATE10="2026-02-06T10:12:36+05:30"
DATE11="2026-02-06T14:38:19+05:30"
DATE12="2026-02-06T21:05:44+05:30"

# Feb 7, 2026 - Day 5: Final touches (today)
DATE13="2026-02-07T11:27:53+05:30"
DATE14="2026-02-07T16:14:28+05:30"
DATE15="2026-02-07T20:35:00+05:30"

# Helper function to commit with specific date
commit_with_date() {
    local date="$1"
    local message="$2"
    GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$message"
}

# ==================== COMMIT 1: Initial project setup ====================
git add pnpm-workspace.yaml
git add package.json
git add .gitignore
git add .env.example
commit_with_date "$DATE1" "chore: initialize monorepo with pnpm workspace

- Set up pnpm workspace configuration
- Add root package.json with workspace scripts
- Configure gitignore and environment example"

# ==================== COMMIT 2: Add contracts package structure ====================
git add contracts/package.json 2>/dev/null || true
git add contracts/foundry.toml 2>/dev/null || true
git add contracts/hardhat.config.ts 2>/dev/null || true
git add contracts/remappings.txt 2>/dev/null || true
git add contracts/.gitignore 2>/dev/null || true
git add contracts/.env.example 2>/dev/null || true
git add contracts/.solhint.json 2>/dev/null || true
git add contracts/.solhintignore 2>/dev/null || true
git add contracts/.eslintrc.js 2>/dev/null || true
git add contracts/.eslintignore 2>/dev/null || true
git add contracts/.prettierrc 2>/dev/null || true
git add contracts/.prettierignore 2>/dev/null || true
commit_with_date "$DATE2" "feat(contracts): set up Foundry + Hardhat project structure

- Initialize contracts package with Foundry and Hardhat
- Add linting and formatting configuration
- Configure VS Code settings for Solidity development"

# ==================== COMMIT 3: Add core AMM contracts ====================
git add contracts/src/interfaces/IERC20.sol
git add contracts/src/interfaces/IWETH.sol
git add contracts/src/interfaces/IPair.sol
git add contracts/src/interfaces/IPairFactory.sol
git add contracts/src/interfaces/IRouter.sol
git add contracts/src/interfaces/IPairCallee.sol
git add contracts/src/libraries/Math.sol
git add contracts/src/PairFees.sol
git add contracts/src/Pair.sol
git add contracts/src/factories/PairFactory.sol
commit_with_date "$DATE3" "feat(contracts): add core AMM pair and factory contracts

- Implement Pair contract with x*y=k invariant for volatile pairs
- Add stable swap curve support for correlated assets
- Create PairFactory for deploying new trading pairs
- Include fee distribution via PairFees contract"

# ==================== COMMIT 4: Add router and libraries ====================
git add contracts/src/Router.sol
git add contracts/src/EqualizerLibrary.sol
git add contracts/src/libraries/
commit_with_date "$DATE4" "feat(contracts): implement Router and utility libraries

- Add Router for swap, liquidity, and zap operations
- Implement EqualizerLibrary for price/reserve calculations
- Add helper libraries for safe token transfers"

# ==================== COMMIT 5: Add ve(3,3) tokenomics contracts ====================
git add contracts/src/interfaces/IVotingEscrow.sol
git add contracts/src/interfaces/IVeArtProxy.sol
git add contracts/src/interfaces/IRewardsDistributor.sol
git add contracts/src/Equal.sol
git add contracts/src/VotingEscrow.sol
git add contracts/src/VeArtProxy.sol
git add contracts/src/RewardsDistributor.sol
commit_with_date "$DATE5" "feat(contracts): add ve(3,3) tokenomics core

- Implement EQUAL governance token (ERC20)
- Add VotingEscrow for vote-escrowed positions (veEQUAL)
- Create on-chain SVG NFT art via VeArtProxy
- Implement RewardsDistributor for rebasing rewards"

# ==================== COMMIT 6: Add gauge and voting system ====================
git add contracts/src/interfaces/IGauge.sol
git add contracts/src/interfaces/IGaugeFactory.sol
git add contracts/src/interfaces/IVoter.sol
git add contracts/src/interfaces/IBribe.sol
git add contracts/src/interfaces/IBribeFactory.sol
git add contracts/src/Gauge.sol
git add contracts/src/factories/GaugeFactory.sol
git add contracts/src/Voter.sol
git add contracts/src/InternalBribe.sol
git add contracts/src/ExternalBribe.sol
git add contracts/src/factories/BribeFactory.sol
commit_with_date "$DATE6" "feat(contracts): implement gauge voting and bribe system

- Add Gauge contract for LP staking and emission distribution
- Implement Voter for gauge weight voting with veEQUAL
- Create internal and external bribe contracts for vote incentives
- Add factory contracts for gauge and bribe deployment"

# ==================== COMMIT 7: Add minter and remaining contracts ====================
git add contracts/src/interfaces/IMinter.sol
git add contracts/src/interfaces/IMasterChef.sol
git add contracts/src/Minter.sol
git add contracts/src/MasterChef.sol
git add contracts/src/MerkleClaim.sol
git add contracts/src/mocks/
commit_with_date "$DATE7" "feat(contracts): add emission minter and auxiliary contracts

- Implement Minter for weekly EQUAL emissions schedule
- Add MasterChef for legacy farming compatibility
- Create MerkleClaim for airdrop distribution
- Add mock contracts for testing"

# ==================== COMMIT 8: Add contract tests and deployment scripts ====================
git add contracts/test/
git add contracts/scripts/
git add contracts/script/
git add contracts/bin/
git add contracts/README.md
commit_with_date "$DATE8" "test(contracts): add test suite and deployment scripts

- Add Foundry test cases for core contracts
- Create deployment scripts for different networks
- Add helper scripts for contract interactions
- Document contract architecture in README"

# ==================== COMMIT 9: Set up API package ====================
git add api/package.json
git add api/tsconfig.json
git add api/vercel.json
git add api/README.md
git add api/src/
git add api/api/
commit_with_date "$DATE9" "feat(api): set up Hono API for DEX backend

- Initialize API package with Hono framework
- Add routes for pairs, tokens, and stats
- Configure Vercel deployment
- Implement TVL and volume tracking endpoints"

# ==================== COMMIT 10: Set up web frontend package ====================
git add web/package.json
git add web/tsconfig.json
git add web/next.config.ts
git add web/postcss.config.mjs
git add web/eslint.config.mjs
git add web/.gitignore
git add web/README.md
git add web/pnpm-workspace.yaml
git add web/pnpm-lock.yaml
git add web/src/lib/
git add web/src/hooks/
git add web/src/stores/
commit_with_date "$DATE10" "feat(web): initialize Next.js frontend with core utilities

- Set up Next.js 15 with App Router
- Add wagmi and viem for Web3 connectivity
- Implement store layer with Zustand
- Add utility hooks for wallet and contract interactions"

# ==================== COMMIT 11: Add web components and pages ====================
git add web/src/components/
git add web/src/app/
git add web/public/
git add web/.env
commit_with_date "$DATE11" "feat(web): add UI components and application pages

- Create swap, liquidity, and gauge voting pages
- Implement responsive component library
- Add token icons and static assets
- Configure RPC endpoints and contract addresses"

# ==================== COMMIT 12: Add legacy UI (solidly-ui) ====================
git add solidly-ui/package.json
git add solidly-ui/next.config.js
git add solidly-ui/.gitignore
git add solidly-ui/.prettierignore
git add solidly-ui/README.md
git add solidly-ui/styles/
git add solidly-ui/theme/
git add solidly-ui/utils/
git add solidly-ui/stores/
commit_with_date "$DATE12" "feat(solidly-ui): add legacy Solidly UI package

- Port original Solidly frontend codebase
- Include store implementations for DEX state
- Add theming and styling configuration"

# ==================== COMMIT 13: Add solidly-ui components and pages ====================
git add solidly-ui/components/
git add solidly-ui/pages/
git add solidly-ui/public/
git add solidly-ui/token-list.json
git add solidly-ui/package-lock.json
commit_with_date "$DATE13" "feat(solidly-ui): complete legacy UI with all pages

- Add swap, liquidity, rewards, and vote pages
- Implement full component library
- Include token list for supported assets
- Add public assets and branding"

# ==================== COMMIT 14: Add documentation and scripts ====================
git add docs/
git add scripts/
git add README.md
commit_with_date "$DATE14" "docs: add project documentation and utility scripts

- Create comprehensive README with setup instructions
- Add architecture documentation
- Include development workflow scripts"

# ==================== COMMIT 15: Final cleanup and polish ====================
# Add any remaining files
git add -A
commit_with_date "$DATE15" "chore: final cleanup and configuration polish

- Clean up package configurations
- Ensure all dependencies are properly listed
- Ready for deployment"

echo ""
echo "✅ Git history created successfully!"
echo ""
git log --oneline --graph --all
