#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
STUDIO_DIR="${REPO_ROOT}/sanity-cms"

if [ -f "${REPO_ROOT}/.env" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    key="${line%%=*}"
    key="${key#"${key%%[![:space:]]*}"}"
    key="${key%"${key##*[![:space:]]}"}"
    if [ -z "${!key:-}" ]; then
      export "$line"
    fi
  done < "${REPO_ROOT}/.env"
fi

: "${SITE_NAME:?SITE_NAME is required}"
: "${SANITY_PROJECT_ID:?SANITY_PROJECT_ID is required}"
: "${SANITY_TOKEN:?SANITY_TOKEN is required}"
: "${CEPH_BUCKET:?CEPH_BUCKET is required}"

DATE=$(date +%Y-%m-%d)
BACKUP_FILE="${REPO_ROOT}/production-${DATE}.tar.gz"
S3_PREFIX="${SITE_NAME}"

echo "Exporting Sanity dataset (project: ${SANITY_PROJECT_ID}, dataset: production)..."
rm -f "${BACKUP_FILE}"
(
  cd "${STUDIO_DIR}"
  # sanity.cli.ts reads SANITY_STUDIO_PROJECT_ID/DATASET from env;
  # mirror them in so loading the CLI config doesn't crash on undefined.
  SANITY_STUDIO_PROJECT_ID="${SANITY_PROJECT_ID}" \
  SANITY_STUDIO_DATASET="production" \
  SANITY_AUTH_TOKEN="${SANITY_TOKEN}" \
    npx --yes sanity@4 dataset export production "${BACKUP_FILE}" \
    --project "${SANITY_PROJECT_ID}"
)

echo "Uploading to s3://${CEPH_BUCKET}/${S3_PREFIX}/$(basename "${BACKUP_FILE}")..."
s3cmd put "${BACKUP_FILE}" \
  "s3://${CEPH_BUCKET}/${S3_PREFIX}/$(basename "${BACKUP_FILE}")"

echo "Cleaning up local file..."
rm "${BACKUP_FILE}"

echo "Done."
