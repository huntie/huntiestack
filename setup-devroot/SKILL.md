---
name: setup-devroot
description: Create a devroot workspace of your own from the huntiestack template, with the public skills installed and an initial commit. Use only when the user invokes /setup-devroot.
license: MIT
disable-model-invocation: true
---

# Set up a devroot

A devroot is a workspace repository that agent sessions run from: a few scripts, an `AGENTS.md` that says how to work, and the skills under its agent directories, with project checkouts, dotfiles and a vault beside them. This skill makes one. The mechanics live in this skill's `scripts/setup-devroot`; read its `--help` first.

1. Check the GitHub CLI first: `gh auth status`. Without `gh`, or signed out, stop and give the install and `gh auth login` steps; the template is fetched through it, and the scripts in the workspace use it.
2. Ask where the devroot should go, suggesting `~/devroot`, and let the user rename it. The directory must be new or empty. Confirm the path.
3. Ask for the GitHub user the devroot is for, suggesting the login from `gh api user --jq .login`, and explain the two optional repositories the workspace brings in under that name, both gitignored and each a repository of its own: `<user>/dotfiles`, cloned to `dotfiles/`, their dotfiles and the agent conventions such as a `CLAUDE.md` that apply across the workspace; and `<user>/vault` (recommended), private, cloned to `vault/`, where plans and working knowledge accumulate across sessions and machines. Most users have neither yet, and that is the expected case: setup notes what it could not find, dotfiles can be added at any time, and the vault is offered in the next step.
4. Run the script with `--dry-run`, the path and `--user`, and report what it will do. Then run it for real. It fetches `devroot-template-latest/` from `huntie/huntiestack` at its latest commit and records that commit in `.devroot-version`, which `/update-devroot` reads later, installs every skill from `huntie/skills` and the vendored pstack principles from `huntie/skills-pstack-vendored` into the agent directories, writes the initial commit, and runs the workspace's own `scripts/setup`. Exit 3 means setup could not clone a `dotfiles` or `vault` repository, expected for a new user; say which.
5. Ask whether to set up a vault now, the private repository of plans and working knowledge the workspace reads. On yes, change into the new devroot and follow the setup-vault skill. Otherwise say it can be done later with `/setup-vault` from inside the workspace.

End with the path, the skills installed, what setup skipped, and `AGENTS.md` as the next thing to read for how sessions work there.
