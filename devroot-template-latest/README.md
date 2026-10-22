# devroot ("huntiestack")

Personal development monorepo.

A mega-workspace for all dev work — containing my dev setup, conventions, and working knowledge. Designed to be a replicable, agent first environment across machines.

On a Mac or dev server, this repo is typically cloned to `~/devroot`.

## Principles

- **One development monorepo.** I often work across more than one open source repo to accomplish an idea. Agent sessions rooted at `~/devroot` are empowered to work across these. My `dotfiles` and agent skills can be maintained continuously in the same session.
- **Shared config, skills, and context across machines.** One clone carries the entire setup to a Mac, a dev server, or a cloud agent environment. Skills load from the committed agent directories with no install step. `vault` is a live, intentionally updated knowledge base.
- **Stacked version control and targeted FB-isms.** Scripts, skills, and IDE setup smoothing over daily workflows and a purposeful developer loop — for Git or [Sapling](https://sapling-scm.com/).

---

## Layout and conventions

See [AGENTS.md](AGENTS.md).

```
devroot/
  # Core checkouts, ensured by setup (gitignored)
  dotfiles/        # huntie/dotfiles — system dotfiles (read-only in cloud envs)
  vault/           # huntie/vault — agent plans + knowledge base (private)

  # Working directories
  projects/        # Project checkouts (gitignored)
  scratch/         # Throwaway checkouts (gitignored)

  # Repo scripts (`dev <script>`)
  scripts/

  # Skills (installed to .[agents|claude]|/skills/)
  skills/          # Published to huntie/skills and huntie/huntiestack
  skills-lock.json # Third party skills
  huntiestack.toml # What publish-huntiestack ships: skills, and a devroot template
```

## Setup

    # Batteries included - clones <user>/dotfiles and <user>/vault if they exist
    ./scripts/setup --user huntie

    # Workspace only, use /setup-vault later
    ./scripts/setup --bare

`setup` ensures:

- The `dotfiles` checkout exists, if available.
- The `vault` checkout exists, if available. This repo is assumed to be private, so where nothing can authenticate it is skipped with a note and `setup` exits 3.
- The VS Code workspace file is generated.
- The `dev` shell function is installed. Skipped in a non-interactive shell.

Everything else, including the committed agent skills, works from a bare clone.

**Note**: After `setup` is run, you can use `dev <script>` from any directory in fish, bash or zsh. Agents should always use `./scripts/<script>`.

## Workflow

Agent sessions run from `~/devroot`. Each step is also a `dev <script>` or skill you can run yourself.

    dev help

### Cloning / updating checkouts

Cloning a repo you work in should be a one-time action or can even be inferred from a plan/memory.

    > "Clone react-native [at this PR] and build RNTester"

    dev checkout react/react-native
    dev checkout react/react-native[@branch|#pr]

- Detects third-party repo forks, tracking `origin` + `upstream`.
- Uncommitted work is parked as a `WIP <date>` commit before any branch switch.

**Optional**: Any checkout can be worked in [Sapling](https://sapling-scm.com/) instead of Git, offering [ISL](https://marketplace.visualstudio.com/items?itemName=meta.sapling-scm) and local stacked commits. To switch, clone using `--sapling`; agents can remember this via `vault`.

### Starting a task

Again, this should be transparent, but is aided by helpers under the hood.

    > "Draft a stack for plan 21"

    dev pull projects/expo
    dev checkout expo/expo@<task-branch> --new

- By default, nothing is committed unless asked for by the user (in this case, "draft a stack") — which again can be customised per project in `vault`.
- When commits are written, the `/commit-msg` skill kicks in, to describe the change as best as possible, writing a **Test Plan** if suitable.

### Submitting PRs

`/submit` and `/submit-stack` open a PR or draft PR for each local commit, moving the commit body into the PR description (including uploading attachments via `dev gh-upload`).

```
> "Commit, make sure the screenshots look good, then submit after"
> "Action Nico's nit comments and resubmit"

   [local]                   [GitHub]

   work on commit or stack
         │
      /submit ─────────────▶ commit linked to PR; its title and
         │                   description become the source of truth
         │
   make changes (out of sync)
         │
      /submit ─(force push)─▶ in sync
         │                   │
         ⋮                   merged on GitHub
```

### Additional skills

- `/autopilot` commits each unit of work as it proves out, for the rest of the session.
- `/plan` triggers a plan stored to `vault/plans/`.
- `/handoff` summarizes the session to `vault/handoffs/` and pushes it, to resume on another machine.
- `/recall` rebuilds a session's context from a past reference.

## The vault

`vault/` is the knowledge graph for the workspace: a shared brain for work that spans sessions, checkouts, and harnesses.

- **Private and live-synced.** A private Git repo of its own. Every write is committed and pushed as it happens, so each machine and session sees the same record.
- **Written on purpose.** Agents write only through `/plan`, a numbered plan before anything is built, and `/reflect`, what a session taught, or when asked. Most tasks add nothing.
- **Read on demand.** `/recall` briefs the agent on where a topic stands, from the vault, the checkouts and GitHub.

It may be helpful to open `vault` in a separate Markdown editor, such as [Obsidian](https://obsidian.md/) or [Cogito](https://cogito.md/).

```
vault/
  memory/              # Workspace + per-repo knowledge (/reflect)
  plans/               # Numbered plans (/plan)
  index.md             # Index of all content
  USER.md              # Optional: who you are and your goals, loaded into every session
  COMMITTING_POLICY.md # How sessions commit here
```

> 💡 Unlike approaches such as [pstack](https://github.com/cursor/plugins/tree/main/pstack/skills), which write learnings into the target repo, `devroot` keeps memory in an *overlay* outside each repo. This is less invasive for open source projects, and leaves room to iterate on prototype skills or individual knowledge.

### First time setup

A new vault can be created with the `setup-vault` skill, and later customised as needed (e.g. `docs/`, `goals/`, `rfcs/`, `epics/`).

    /setup-vault

Again, you are encouraged to customise `vault` as you wish!

## [Experimental] Commit Cloud

[Sapling](https://sapling-scm.com/) checkouts only.

Mechanism to back up and restore draft Sapling stacks across machines, through a private `<user>/commit-cloud` repo of git bundles. Inspired by Meta's Commit Cloud, which open-source Sapling disables for git repos.

    dev commit-cloud backup
    dev pull

Backing up is explicit, and the first run clones the private repo to `.commit-cloud/`, which turns the feature on.

- `dev pull` then restores the other machines' stacks into `sl smartlog` beside your own, with their branches and a `<host>/backup-<date>` bookmark.
- Hiding or amending a stack anywhere retracts it everywhere at the next backup and pull.
- Nothing is ever deleted from the `commit-cloud` repo.
