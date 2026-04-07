#!/bin/bash
set -e

# --- Phase 1: Root — fix ownership on named volumes only ---
# Bind mounts (workspace, .claude) are handled by Docker Desktop VirtioFS.
# Named volumes (node_modules) need explicit ownership fix.
if [ -d "/workspace/node_modules" ]; then
  chown -R claude:claude /workspace/node_modules
fi

# --- Phase 1.5: Root — create symlinks for host path resolution ---
# Hooks use $HOME/dotfiles/... but symlinks and settings use /Users/ericcai/...
# Bridge the gap: $HOME → /Users/ericcai mount points
mkdir -p /home/claude/dotfiles /home/claude/.config
ln -sfn /Users/ericcai/dotfiles/claude /home/claude/dotfiles/claude
ln -sfn /Users/ericcai/.config/ccusage-tracker /home/claude/.config/ccusage-tracker

# Project-specific memory: host path key → container workspace path key
# Host 用 -Users-ericcai-project-1111-maid-refactor，容器內 Claude 會找 -workspace
PROJ_HOST="/home/claude/.claude/projects/-Users-ericcai-project-1111-maid-refactor"
PROJ_CONTAINER="/home/claude/.claude/projects/-workspace"
if [ -d "$PROJ_HOST" ] && [ ! -e "$PROJ_CONTAINER" ]; then
  ln -sfn "$PROJ_HOST" "$PROJ_CONTAINER"
fi

# --- Phase 2: Drop to non-root user via gosu ---
exec gosu claude bash -c '
set -e

# Git identity for agent commits
git config --global user.name "Claude Agent"
git config --global user.email "claude-agent@local"

# Mark workspace as safe (mounted volume)
git config --global --add safe.directory /workspace

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
  echo "Installing dependencies..."
  npm install --legacy-peer-deps

  # Generate Prisma Client (PRISMA_SKIP_POSTINSTALL_GENERATE blocks auto-generate)
  if [ -f "prisma/schema.prisma" ]; then
    echo "Generating Prisma Client..."
    npx prisma generate
  fi
fi

exec "$@"
' -- "$@"
