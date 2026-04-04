#!/bin/bash
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

  # Generate Prisma Client (schema is bind-mounted from host)
  if [ -f "prisma/schema.prisma" ]; then
    echo "Generating Prisma Client..."
    npx prisma generate
  fi
fi

exec "$@"
