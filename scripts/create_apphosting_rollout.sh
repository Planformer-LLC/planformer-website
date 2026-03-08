#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-}"
BRANCH="${2:-$(git branch --show-current)}"

if [[ -z "$ENVIRONMENT" ]]; then
  echo "Usage: $0 <dev|prod> [branch]"
  exit 1
fi

case "$ENVIRONMENT" in
  dev)
    PROJECT_ID="planformerdev-bb2cf"
    BACKEND_ID="planformer-website-dev"
    ;;
  prod)
    PROJECT_ID="planformer-3408e"
    BACKEND_ID="planformer-website"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    echo "Usage: $0 <dev|prod> [branch]"
    exit 1
    ;;
esac

echo "Creating App Hosting rollout"
echo "  environment: $ENVIRONMENT"
echo "  project:     $PROJECT_ID"
echo "  backend:     $BACKEND_ID"
echo "  branch:      $BRANCH"

firebase apphosting:rollouts:create "$BACKEND_ID" \
  --project "$PROJECT_ID" \
  --git-branch "$BRANCH" \
  --force
