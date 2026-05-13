# church-website

Monorepo for the church site. Two workspaces:

- `nextjs-app/` — Next.js 15 static-export site, deployed to Cloudflare Pages
- `sanity-cms/` — Sanity v4 Studio for content authoring

Shared tooling and the Sanity backup script live at the root.

## Repo layout

```
.
├── nextjs-app/              # Next.js frontend (output: "export", images from cdn.sanity.io)
├── sanity-cms/              # Sanity Studio (package name: "sanity-cms")
├── scripts/
│   ├── backup-sanity.sh     # Dataset export + S3 upload (see "Sanity backups")
│   └── lifecycle.xml        # Bucket lifecycle policy (30-day expiration)
├── .env.example             # Template for the backup script's required vars
├── package.json             # Root: convenience scripts + packageManager pin
├── pnpm-workspace.yaml      # Workspace packages + overrides + supply-chain rules
└── pnpm-lock.yaml           # Single root lockfile for both workspaces
```

## Package management

This repo uses **pnpm workspaces** with the package manager version pinned via `packageManager` in the root `package.json` and resolved through **corepack**. Make sure corepack is enabled once per machine:

```bash
corepack enable
```

After that, any `pnpm` invocation in this repo uses the pinned version regardless of what's globally installed.

### Workspace rules (`pnpm-workspace.yaml`)

Some rules in `pnpm-workspace.yaml` are intentional and load-bearing — don't strip them without thinking:

- **`blockExoticSubdeps: true`**. Forbids transitive deps from resolving to git refs (`github:`, `git+ssh://`) or raw tarball URLs (`https://.../foo.tgz`) — they must come from the registry, a workspace, or local file. Default-on in pnpm 11 but pinned explicitly. Pairs with `minimumReleaseAge`: without it, a registry package could side-load malicious code from a git URL and skip the age check entirely.
- **`minimumReleaseAge: 10080`** (7 days). Mitigates supply-chain attacks from freshly-published malicious versions. Some packages don't publish `time` metadata so they're listed under `minimumReleaseAgeExclude`.
- **`allowBuilds`**. pnpm 11 blocks install scripts by default. Only `esbuild`, `sharp`, and `unrs-resolver` are allowed to run their postinstall scripts. Add new entries here (as `pkg: true`) when a dependency legitimately needs to build native code. Note: this is the **pnpm 11** key — `onlyBuiltDependencies` (the pnpm 10 name) is silently ignored, and `pnpm install` will write a placeholder `allowBuilds:` template into this file if it isn't already present.
- **`overrides`**. Centralized version pins for transitive deps. Patches known CVEs in `postcss`/`minimatch`/`glob`/`prismjs` and keeps `@types/react` consistent across workspaces. **Per-workspace `pnpm.overrides` blocks are ignored by pnpm** — always edit the root file.

### Common commands (run from repo root)

```bash
pnpm install              # installs both workspaces
pnpm dev:site             # Next.js dev server
pnpm dev:studio           # Sanity Studio dev server
pnpm build:site           # next build (static export to nextjs-app/out)
pnpm build:studio         # sanity build
pnpm lint                 # next lint (site only — studio has no lint script)
pnpm login:studio         # sanity login (run from studio context)
pnpm deploy:studio        # sanity deploy (pushes Studio to Sanity hosting)
pnpm backup:sanity        # see "Sanity backups" below
```

The root scripts use `pnpm -C <dir>` rather than `--filter` because directory-scoped invocation is less ambiguous (no need to remember which workspace `name:` maps to which folder).

### Studio env vars

`sanity-cms/sanity.cli.ts` and `sanity-cms/sanity.config.ts` read `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` from the environment (with a non-null TS assertion). Those vars must be set in `sanity-cms/.env` (or exported) before `pnpm dev:studio` or `pnpm build:studio` will work. The backup script auto-mirrors `SANITY_PROJECT_ID` → `SANITY_STUDIO_PROJECT_ID` when invoking `sanity@4 dataset export` so the CLI config can load without crashing.

## Sanity backups

Daily dataset export → upload to S3-compatible object storage (Ceph RGW) → 30-day auto-expiration via a bucket lifecycle policy.

### How it works

1. `scripts/backup-sanity.sh` exports the `production` dataset to a tarball and uploads it to `s3://$CEPH_BUCKET/$SITE_NAME/production-YYYY-MM-DD.tar.gz`.
2. Old objects are **not** pruned by the script. A bucket-level lifecycle policy (`scripts/lifecycle.xml`) expires every object in the bucket after 30 days.
3. The script is invoked by a cron on the host VPS (not GitHub Actions).

### Required env vars (loaded from root `.env`)

```
SITE_NAME             # backup path prefix, e.g. "church-website"
SANITY_PROJECT_ID     # Sanity project ID
SANITY_TOKEN          # Sanity API token — Read role is sufficient
CEPH_BUCKET           # target bucket
```

Copy `.env.example` to `.env` and fill in. The script auto-sources `.env` if present; shell-exported vars take precedence over the file. S3 credentials and endpoint live in `~/.s3cfg` (s3cmd config), not in `.env`.

### Why s3cmd, not aws-cli

s3cmd is the chosen S3 client. Ceph RGW on this provider only supports **path-style** addressing, so `~/.s3cfg` must set `host_bucket = <same host as host_base>` (no `%(bucket)s` template).

### Lifecycle policy

Defined in `scripts/lifecycle.xml`. Apply once per bucket:

```bash
s3cmd setlifecycle scripts/lifecycle.xml s3://$CEPH_BUCKET
s3cmd getlifecycle s3://$CEPH_BUCKET   # verify
```

The rule has an empty `<Prefix>` — it expires every object in the bucket. Backups from other projects sharing the bucket are namespaced under `$SITE_NAME`.

### Restoring

```bash
s3cmd get s3://$CEPH_BUCKET/$SITE_NAME/production-YYYY-MM-DD.tar.gz
cd sanity-cms
SANITY_STUDIO_PROJECT_ID=$SANITY_PROJECT_ID \
SANITY_STUDIO_DATASET=production \
SANITY_AUTH_TOKEN=... npx sanity@4 dataset import \
  ../production-YYYY-MM-DD.tar.gz production \
  --project $SANITY_PROJECT_ID --replace
```

The `dataset import` CLI requires being run from inside the Sanity project directory, same as export.

## Deployment

- **Site:** Next.js static export (`next build` → `nextjs-app/out/`) deployed to Cloudflare Pages.
- **Studio:** `pnpm deploy:studio` pushes the Studio bundle to Sanity's hosted environment.

### Cloudflare Pages build settings

- **Root directory:** `nextjs-app`
- **Build command:** `pnpm run build`
- **Build output:** `out`
- **Build system version:** **v3** (Pages → Settings → Build → Build system version). v3 ships Node 22.16.0, which is what pnpm 11 needs (requires Node ≥22.13). v2 ships Node 18 and v1 ships Node 12 — both fail the install with `ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite` because pnpm 11's `node:sqlite` import doesn't exist on those older runtimes.
- **Environment variable:** `NODE_VERSION=22.22.2` — **required even on v3**. In practice, flipping the build system version alone wasn't enough; the build kept installing Node 20.20.0 until this env var was set. Set it in Pages → Settings → Variables and Secrets for both Production and Preview. Without it, you'll see the `node:sqlite` crash above regardless of what the build-system-version dropdown says.
- **Build-time Sanity env vars:** The site reads Sanity config (project ID, dataset, possibly read token) via Next.js env vars at build time. Make sure those are also set in Pages → Variables and Secrets.
