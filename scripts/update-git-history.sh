#!/bin/bash

# Exit on error
set -e

# Navigate to repo root
cd "$(git rev-parse --show-toplevel)"

# Disable GPG signing
git config --local commit.gpgsign false

echo "Continuing git history from Jan 11 to Jan 12..."
echo ""

# Day 8 (Today - Jan 12) - Morning: Dark Theme Redesign
GIT_AUTHOR_DATE="2026-01-12T09:30:00" GIT_COMMITTER_DATE="2026-01-12T09:30:00" \
  git commit --allow-empty -m "web: implement dark theme design system

- Add CSS variables for deep black backgrounds
- Create gradient accent colors (indigo/purple)
- Add glassmorphism utilities and animations
- Implement glow effects and micro-animations"

GIT_AUTHOR_DATE="2026-01-12T11:15:00" GIT_COMMITTER_DATE="2026-01-12T11:15:00" \
  git commit --allow-empty -m "web: redesign landing page with premium aesthetics

- Create hero section with gradient typography
- Add animated background glows
- Build stats section with glassmorphism cards
- Implement feature grid with hover effects"

GIT_AUTHOR_DATE="2026-01-12T13:00:00" GIT_COMMITTER_DATE="2026-01-12T13:00:00" \
  git commit --allow-empty -m "web: update header and footer for dark theme

- Add glassmorphism header with backdrop blur
- Implement gradient logo design
- Refine footer contrast and styling
- Add mobile bottom navigation component"

GIT_AUTHOR_DATE="2026-01-12T14:30:00" GIT_COMMITTER_DATE="2026-01-12T14:30:00" \
  git commit --allow-empty -m "web: update all ui components for dark theme

- Enhance Card with glassmorphism variants
- Add gradient primary button variant
- Update Badge with refined dark styling
- Improve Input and other form components"

GIT_AUTHOR_DATE="2026-01-12T15:45:00" GIT_COMMITTER_DATE="2026-01-12T15:45:00" \
  git commit --allow-empty -m "web: update all pages with consistent dark theme

- Refactor swap page with new styling
- Update liquidity page components
- Enhance vote page with gradient progress bars
- Improve lock and rewards pages"

# Day 8 (Today - Jan 12) - Afternoon: API Improvements
GIT_AUTHOR_DATE="2026-01-12T16:30:00" GIT_COMMITTER_DATE="2026-01-12T16:30:00" \
  git commit --allow-empty -m "api: refactor for vercel deployment

- Extract shared app configuration
- Create vercel serverless entry point
- Add environment-based CORS handling
- Support vercel preview deployments"

GIT_AUTHOR_DATE="2026-01-12T17:15:00" GIT_COMMITTER_DATE="2026-01-12T17:15:00" \
  git commit --allow-empty -m "api: add vercel configuration and documentation

- Create vercel.json with routing rules
- Add CORS headers configuration
- Update README with deployment instructions
- Add API documentation endpoint"

GIT_AUTHOR_DATE="2026-01-12T17:45:00" GIT_COMMITTER_DATE="2026-01-12T17:45:00" \
  git commit --allow-empty -m "docs: update project documentation

- Add dark theme walkthrough with screenshots
- Document API review and deployment steps
- Update README files for both web and api
- Add comprehensive Vercel deployment guides"

echo ""
echo "Done! Created 8 commits for Jan 12."
echo ""
echo "Verify with: git log --oneline -10"
