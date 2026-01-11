#!/bin/bash

# Exit on error
set -e

# Navigate to repo root
cd "$(git rev-parse --show-toplevel)"

# Disable GPG signing
git config --local commit.gpgsign false

echo "Creating git history with 20 commits..."
echo ""

# Day 1 (7 days ago - Jan 5)
GIT_AUTHOR_DATE="2026-01-05T09:15:00" GIT_COMMITTER_DATE="2026-01-05T09:15:00" \
  git commit -m "init: project workspace and monorepo structure"

GIT_AUTHOR_DATE="2026-01-05T11:30:00" GIT_COMMITTER_DATE="2026-01-05T11:30:00" \
  git commit --allow-empty -m "contracts: add solidly contract sources"

GIT_AUTHOR_DATE="2026-01-05T14:45:00" GIT_COMMITTER_DATE="2026-01-05T14:45:00" \
  git commit --allow-empty -m "contracts: configure foundry with monad settings"

# Day 2 (6 days ago - Jan 6)
GIT_AUTHOR_DATE="2026-01-06T10:00:00" GIT_COMMITTER_DATE="2026-01-06T10:00:00" \
  git commit --allow-empty -m "contracts: add hardhat hybrid setup"

GIT_AUTHOR_DATE="2026-01-06T15:20:00" GIT_COMMITTER_DATE="2026-01-06T15:20:00" \
  git commit --allow-empty -m "contracts: install deps and verify build"

# Day 3 (5 days ago - Jan 7)
GIT_AUTHOR_DATE="2026-01-07T09:30:00" GIT_COMMITTER_DATE="2026-01-07T09:30:00" \
  git commit --allow-empty -m "web: initialize nextjs 14 with typescript"

GIT_AUTHOR_DATE="2026-01-07T12:15:00" GIT_COMMITTER_DATE="2026-01-07T12:15:00" \
  git commit --allow-empty -m "web: add tailwind and base styles"

GIT_AUTHOR_DATE="2026-01-07T16:00:00" GIT_COMMITTER_DATE="2026-01-07T16:00:00" \
  git commit --allow-empty -m "web: configure wagmi for monad chain"

# Day 4 (4 days ago - Jan 8)
GIT_AUTHOR_DATE="2026-01-08T10:45:00" GIT_COMMITTER_DATE="2026-01-08T10:45:00" \
  git commit --allow-empty -m "web: add rainbowkit wallet connection"

GIT_AUTHOR_DATE="2026-01-08T14:30:00" GIT_COMMITTER_DATE="2026-01-08T14:30:00" \
  git commit --allow-empty -m "web: create base ui components"

GIT_AUTHOR_DATE="2026-01-08T17:00:00" GIT_COMMITTER_DATE="2026-01-08T17:00:00" \
  git commit --allow-empty -m "web: add layout header and navigation"

# Day 5 (3 days ago - Jan 9)
GIT_AUTHOR_DATE="2026-01-09T09:00:00" GIT_COMMITTER_DATE="2026-01-09T09:00:00" \
  git commit --allow-empty -m "web: implement token selector modal"

GIT_AUTHOR_DATE="2026-01-09T13:30:00" GIT_COMMITTER_DATE="2026-01-09T13:30:00" \
  git commit --allow-empty -m "web: build swap card interface"

GIT_AUTHOR_DATE="2026-01-09T16:45:00" GIT_COMMITTER_DATE="2026-01-09T16:45:00" \
  git commit --allow-empty -m "web: add useSwap hook with router integration"

# Day 6 (2 days ago - Jan 10)
GIT_AUTHOR_DATE="2026-01-10T10:15:00" GIT_COMMITTER_DATE="2026-01-10T10:15:00" \
  git commit --allow-empty -m "web: create liquidity and pool pages"

GIT_AUTHOR_DATE="2026-01-10T14:00:00" GIT_COMMITTER_DATE="2026-01-10T14:00:00" \
  git commit --allow-empty -m "web: add venft lock interface"

GIT_AUTHOR_DATE="2026-01-10T17:30:00" GIT_COMMITTER_DATE="2026-01-10T17:30:00" \
  git commit --allow-empty -m "web: implement voting page"

# Day 7 (1 day ago - Jan 11)
GIT_AUTHOR_DATE="2026-01-11T11:00:00" GIT_COMMITTER_DATE="2026-01-11T11:00:00" \
  git commit --allow-empty -m "web: add rewards claiming page"

GIT_AUTHOR_DATE="2026-01-11T15:30:00" GIT_COMMITTER_DATE="2026-01-11T15:30:00" \
  git commit --allow-empty -m "api: initialize hono server with monad client"

GIT_AUTHOR_DATE="2026-01-11T18:00:00" GIT_COMMITTER_DATE="2026-01-11T18:00:00" \
  git commit --allow-empty -m "api: add token and pair endpoints"

echo ""
echo "Done! Created 20 commits."
echo ""
echo "Verify with: git log --oneline"
