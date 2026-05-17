#!/usr/bin/env bash
set -euo pipefail

if [ ! -d node_modules ]; then
  npm ci
fi

if [ -e node_modules/.bin/vite ]; then
  chmod a-x node_modules/.bin/vite || true
fi

chmod +x node_modules/.bin/* && npm run build
