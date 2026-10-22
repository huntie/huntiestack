---
name: setup-vault
description: First-time setup of vault/ as a private git repository with its README, index, committing policy, and gitignore. Use only when the user invokes /setup-vault.
disable-model-invocation: true
---

# Setup vault

The mechanics live in this skill's `scripts/setup-vault`, run from the workspace root; read its `--help` first. This skill is the judgment around it, for a machine that has no vault yet.

1. Settle where the vault will live before running anything. Find the GitHub username with `gh api user --jq .login` when `gh` is authenticated, otherwise ask for it. Then ask, with the username filled in, which of these the user wants: create `<username>/vault` as a new private repository (recommended, and what the script does when the repository is missing); use an existing repository they name; or keep the vault local with no remote for now. Confirm the repository name before continuing.
2. Run this skill's `scripts/setup-vault --dry-run` from the workspace root, with `--repo <owner/repo>` for the first two answers, and report what it will do.
3. Run it for real. Exit 3 lists what needs a human, and for a fresh vault that is the first commit: make it and push only when the user says to. Rerun the script afterward; it exits 0 once the vault has a commit.
4. An existing vault is never rewritten. A later run only compares the conventions between the `setup-vault` markers in `vault/README.md` with the template beside the script and reports drift. The fix is a hand edit on whichever side is wrong: the template is what new vaults get, the README is what this vault says. Text outside the markers belongs to the user.
