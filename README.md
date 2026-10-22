# huntiestack (Preview)

[![skills.sh](https://skills.sh/b/huntie/huntiestack)](https://skills.sh/huntie/huntiestack)

**Build a single agent-first dev workspace.**

<img width="300" src="https://github.com/user-attachments/assets/2fa0e819-8d8a-435c-bad9-f2f147984a1f" />

[Rebuilding Meta's Dev Stack Out of Meta | React Native Live](https://www.youtube.com/live/zazUsINu9AQ?si=v33vCNORWM08H9D_&t=613)

## What is huntiestack?

huntiestack revolves around the `devroot` repo — a single private megarepo workspace for all development work, designed to replace your traditional `~/Development` folder.

The repo itself is small: a folder structure, an `AGENTS.md`, a dozen bash scripts, and skills. It enables agents to checkout other repos as needed *and work across them*, and store knowledge from across sessions in a private `vault`.

### Principles

- **One development monorepo.** I often work across more than one open source repo to accomplish an idea. Agent sessions rooted at `~/devroot` are empowered to work across these. My `dotfiles` and agent skills can be maintained continuously in the same session.
- **Shared config, skills, and context across machines.** One clone carries the entire setup to a Mac, a dev server, or a cloud agent environment. Skills load from the committed agent directories with no install step. `vault` is a live, intentionally updated knowledge base.
- **Stacked version control and targeted FB-isms.** Scripts, skills, and IDE setup smoothing over daily workflows and a purposeful developer loop — for Git or [Sapling](https://sapling-scm.com/).

### What's actually in this repo

This the a public starter kit for `devroot` mirrored from my personal `huntie/devroot` repo (private).

- The `/setup-devroot` and `/setup-vault` skills, installable via `npx skills`.
- The synced `devroot-template-latest/` folder, containing the public core of devroot, that the setup skill downloads.

## Get started

Install the two skills here into your home directory, then ask your agent to set up a devroot of your own:

    npx skills add huntie/huntiestack -g
    /setup-devroot

That fetches `devroot-template-latest/` from this repo, installs every skill from [huntie/skills](https://github.com/huntie/skills), writes the initial commit, and runs the workspace's own setup.

#### This is a starting point!

Everyone's dev setup is different. `/setup-devroot` gives you a folder structure, control plane scripts, and the `vault` repo. You're free to customise the vault as you need, as well as to uninstall my skills in `skills-lock.json` and fork them in your `skills/` folder. Build what works for you 💯.

## Use directly or take inspiration

The full devroot layout:

```
devroot/
  # Optional: <user>/dotfiles — system dotfiles 
  dotfiles/

  # Working directories
  projects/        # Project checkouts (gitignored)
  scratch/         # Throwaway checkouts (gitignored)

  # Repo scripts (`dev <script>`)
  scripts/

  # Skills (installed to .[agents|claude]|/skills/)
  skills/          # Your skills
  skills-lock.json # Third party skills

  # Optional: <user>/vault repo — agent plans + knowledge base (private)
  vault/
    memory/              # Workspace + per-repo knowledge (/reflect)
    plans/               # Numbered plans (/plan)
    index.md             # Index of all content
    USER.md              # Optional: Who you are and your goals
    COMMITTING_POLICY.md # How sessions commit here

  # Optional: <user>/commit-cloud repo - private Git backups
  .commit-cloud/   # `dev commit-cloud`
```
