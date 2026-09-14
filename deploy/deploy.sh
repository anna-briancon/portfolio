#!/usr/bin/env bash
# Deploy helper — run from your machine or on the VPS after git pull
set -euo pipefail

cd "$(dirname "$0")/.."

npm install --legacy-peer-deps
npm run build
pm2 restart portfolio || pm2 start npm --name portfolio -- start
pm2 save

echo "Deploy done."
