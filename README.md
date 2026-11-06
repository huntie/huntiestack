# huntiestack (Preview)

[![skills.sh](https://skills.sh/b/huntie/huntiestack)](https://skills.sh/huntie/huntiestack)

**Build a single agent-first dev workspace.**

<img width="250" src="https://github.com/user-attachments/assets/2fa0e819-8d8a-435c-bad9-f2f147984a1f" />

[Rebuilding Meta's Dev Stack Out of Meta | React Native Live](https://www.youtube.com/live/zazUsINu9AQ?si=v33vCNORWM08H9D_&t=613)

## What is huntiestack?

huntiestack is an opinionated dev setup revolving around the `devroot` repo — a single private mega-workspace for all development work, designed to replace your traditional `~/Development` folder.

`devroot` gives your agent a **superpowered frame** to work in:
- A folder structure, scripts, and skills empowering it to checkout your projects **and work across them**.
- Context stored in a private shared `vault` providing **self-improving personal knowledge**.
- An refined commit workflow for creating high quality PRs and **Meta-like source control** (optional).
- All of this, portable across sessions and machines, meaning you can trivially set up bots that **behave like you**.

This repo ([huntiestack](https://github.com/huntie/huntiestack)) is a public starter kit for this setup, mirrored from my personal `huntie/devroot` repo (private).

## Get started

Install all huntiestack skills (shortcut for `npx skills add huntie/huntiestack`):

    npx huntiestack

Then, ask your agent to set up your devroot repo:

    /setup-devroot

The setup skill fetches `devroot-template-latest/`, installs [skills](https://github.com/huntie/skills), writes the initial commit, and runs the minimal workspace setup script.

#### This is a starting point!

Everyone's dev setup is different. `/setup-devroot` gives you a folder structure, control plane scripts, and the `vault` repo. You're free to customise the vault as you need, as well as to uninstall my skills in `skills-lock.json` and fork them in your `skills/` folder. Build what works for you 💯.

## Principles

- **One development monorepo.** I often work across more than one open source repo to accomplish an idea. Agent sessions rooted at `~/devroot` are empowered to work across these. My `dotfiles` and agent skills can be maintained continuously in the same session. Bug fixing something I just saw in Expo or React Native is **zero friction**.
- **Shared config, skills, and context across machines.** One clone carries my entire dev setup to a Mac, a dev server, or a cloud agent environment. Skills load from the committed agent directories with no install step. `vault` is a live, intentionally updated knowledge base.
- **Stacked version control and targeted FB-isms.** Scripts, skills, and IDE setup smoothing over daily workflows and a purposeful developer loop — for Git or [Sapling](https://sapling-scm.com/).

## Use directly or take inspiration

The full devroot layout:

```sh
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
```
