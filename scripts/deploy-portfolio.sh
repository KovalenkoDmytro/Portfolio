#!/usr/bin/env bash
# Run locally; the SSH host is the same one used by the homeserver shell alias.
set -euo pipefail

ssh_host="${PORTFOLIO_SSH_HOST:-my-server-cf}"
remote_script=$(cat <<'REMOTE'
set -euo pipefail
cd "$HOME/apps/portfolio"

if [[ ! -d .git ]]; then
  printf 'Error: %s is not a Git checkout.\n' "$PWD" >&2
  exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=normal)" ]]; then
  printf 'Error: server checkout has uncommitted or untracked files. Resolve them before deploying.\n' >&2
  git status --short >&2
  exit 1
fi
if [[ "$(git branch --show-current)" != master ]]; then
  printf 'Error: expected branch master on the server.\n' >&2
  exit 1
fi

printf '\n==> Updating master from origin (fast-forward only)\n'
previous_head=$(git rev-parse HEAD)
git pull --ff-only origin master

if [[ ! -d node_modules ]] || ! git diff --quiet "$previous_head" HEAD -- package.json package-lock.json; then
  printf '\n==> Installing locked npm dependencies\n'
  npm ci --include=dev
fi

printf '\n==> Building portfolio\n'
npm run build

printf '\n==> Restarting Supervisor program portfolio\n'
sudo supervisorctl restart portfolio
printf '\n==> Verifying process status\n'
sudo supervisorctl status portfolio
printf '\nDeployment finished: %s\n' "$(git rev-parse --short HEAD)"
REMOTE
)

# Pass the remote program as an argument so SSH retains its terminal for sudo.
encoded_script=$(printf '%s' "$remote_script" | base64 | tr -d '\n')
exec ssh -tt "$ssh_host" "bash -lc \"\$(printf '%s' '$encoded_script' | base64 -d)\""
