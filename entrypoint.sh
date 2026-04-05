#!/bin/bash
set -e

# --- Phase 1: Root — fix ownership on named volumes only ---
# Bind mounts (workspace, .claude) are handled by Docker Desktop VirtioFS.
# Named volumes (node_modules) need explicit ownership fix.
if [ -d "/workspace/node_modules" ]; then
  chown -R claude:claude /workspace/node_modules
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
