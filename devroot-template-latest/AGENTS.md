# devroot workspace

This is `devroot`, a monorepo workspace and control plane for all dev work, typically cloned to `~/devroot` on a Mac or dev server. `README.md` covers the intent and human-facing setup; this file is the working guide for agent sessions.

**The premise**: One idea often spans several repos, so sessions rooted here work across checkouts as asked, and maintain the environment itself (dotfiles, skills, vault) as part of normal work. The repo tracks only its own files; `projects/`, `dotfiles/`, `vault/`, `scratch/`, and `tools/` are gitignored working areas whose contents live elsewhere.

Two rules cover most tasks:

- A repo the task needs and `projects/` lacks is added with `scripts/checkout <owner/repo>`, never plain `git clone`; a `#pr` or `@branch` suffix lands it on that ref.
- Workspace scripts run as `./scripts/<script>` from this root, and `scripts/help` indexes them. `dev <script>` is the same thing for interactive shells; don't rely on it being installed.

## Layout

```
devroot/
├── .agents/                # Committed per-agent skill links — sync-skills owns this
├── .claude/                # Same, for Claude Code
├── vault/                  # The private <user>/vault checkout: plans and working knowledge for every repo; start at vault/index.md
├── scripts/                # Workspace scripts
│   ├── dev.fish            # The `dev` dispatcher for interactive fish shells; linked by setup
│   ├── dev                 # The same for any shell, linked into ~/.local/bin by setup
│   └── …                   # Everything else self-documents: run scripts/help for the index
├── skills/                 # This workspace's own skills; the agent directories link here
├── projects/               # Working checkouts: origin = personal fork and upstream = canonical, or origin = a shared repo
├── dotfiles/               # The <user>/dotfiles checkout
├── scratch/                # Throwaway checkouts and files; one-off files go here, not at the root
├── tools/                  # Third-party toolchains on PATH
└── devroot.code-workspace  # Generated VS Code entry point — never edit by hand
```

- Run `scripts/sync-skills` after adding or removing a skill in `skills/`, and commit the links it writes. Never edit `.claude/`, `.agents/`, or the workspace file by hand; the scripts own them. Real directories inside the agent directories are third-party skills; leave them alone.
- Never run `git clean -fdx` at this root; `-x` deletes every checkout in `projects/`, `tools/`, and `scratch/`.
- Treat `dotfiles/` as a public repo. Nothing private belongs there; anything private needs a home in this repo instead.

## Working here

- Personal conventions, writing style, code style, commit and verification workflow, live in the user's dotfiles and apply throughout. Import them here with an `@dotfiles/<path>` line once `dotfiles/` carries them.
- Reading across the whole tree is deliberate; a single task often spans checkouts. Still scope edits to the checkouts the task is about, and say so when a change in one requires a change in another.
- Your devroot is the checkout you started in (`git rev-parse --show-toplevel`). Never cd into or write under another devroot checkout.
- Each checkout is an independent upstream project: read its own `CLAUDE.md` or `AGENTS.md` before changing code there.
- `vault/USER.md`, when present, identifies the user and their goals: read it at the start of a session. It is the user's to write; change it only when asked.
- When you start a web dev server, keep it from opening a browser: find the flag in the tool's `--help`, such as `--no-open`, pass it, and give the user the local URL to click.

### Making changes

- Work that will land a commit in a checkout happens on a task branch, created before the first edit, except in a Sapling checkout of a shared repo (below). The name is brief kebab-case (`fix-flake-detection`, never `feature/…`). Reading and research need no branch.
- The prefix follows the remote layout. On a fork, where `upstream` exists, the branch lives on your fork and takes no prefix. On a shared repo, where `origin` is the canonical repo and not yours, it takes `devroot.branchPrefix` from git config, else the owner prefix, `<you>/fix-flake-detection`; `checkout --new` adds it for you.
- Start it with `scripts/pull`, then `scripts/checkout <owner/repo>@<name> --new`. Uncommitted work is no reason to stop or ask: `scripts/pull` parks it as a "WIP <date>" commit on the branch it sits on, where its task picks it up; never shelve, stash or discard it. When that work is this task's own and sits on the synced default branch, branch with `git switch -c <name>` instead, so the WIP commit comes along.
- Multi-part work is a stack on that branch: `gh stack init <name>`, then `gh stack add` per layer, per the gh-stack skill. Stacked PRs are same-repository, so `origin` must be where the PRs open.
- A repo with `devroot.vcs=sapling` in its git config commits with `sl`, and a stack there is `sl` commits on the task branch, submitted per the submit-stack skill. On a shared repo, where `origin` is canonical, Sapling takes no named task branch at all: commit drafts with `sl` on top of the synced default branch, and `sl pr submit` pushes each PR from its own `pr<number>` branch. Never create or push a `<prefix>/<name>` branch there, by `git switch -c`, `checkout --new` or `git push`. Run `sl` from inside the repo, never with `-R` or `--cwd`, or it caches another repo's remotes and identity. `sl goto` leaves the branch, so `git switch <branch>` before committing at the top. `sl` cannot see a `git worktree` of such a checkout, so work in the checkout itself.
- `devroot.vcs` and `devroot.branchPrefix` come from per-org includes in the user's gitconfig, or from one repo's local config for a choice that stays on one machine; `checkout --sapling` sets the former.
- A task that edits several checkouts uses the same branch name in each; that shared name is the logical branch, created in every checkout the task touches and named when reporting or opening PRs.
- A plan names its branch in `overview.md`; a session resuming the plan lands on that branch in each checkout it lists rather than starting a new one.
- This repo, `vault`, and `dotfiles` are main-only: they commit on `main` and never branch.

### Writing to the vault

- Writes go through `/reflect` and `/plan`, never in passing. A session working a plan updates that plan as it goes.
- Run reflect at the end of a task when one of its triggers holds. It applies the bar in `vault/README.md`, and writing nothing is the default.
- Every vault write is committed and pushed at once, per `vault/COMMITTING_POLICY.md`. A report mentions that only when it went wrong, such as a failed push or a write left uncommitted.

## Conventions

- Each script takes `--help`; read it before running one. All are bash, need only `git` and use `gh` when available, and are safe to rerun. Exit 3 means something needs a human.
