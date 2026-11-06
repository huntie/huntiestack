---
name: update-devroot
description: Bring a devroot made from the huntiestack template up to date with the latest template, merged with local edits, as one commit. Use only when the user invokes /update-devroot.
license: MIT
disable-model-invocation: true
---

# Update devroot

A devroot made by setup-devroot is a copy of huntiestack's `devroot-template-latest/` at one commit, recorded in `.devroot-version`. This skill brings the template files up to that directory's latest commit as one commit titled `Update devroot to <sha>`, merging the template's changes three-way with the user's own edits so those survive. The mechanics live in this skill's `scripts/update-devroot`; read its `--help` first.

1. Check the GitHub CLI: `gh auth status`. Without `gh`, or signed out, stop and give the `gh auth login` step; the template is fetched through it.
2. Confirm the session is inside the devroot to update, a git checkout with `AGENTS.md` and `scripts/`, with a clean tree. Uncommitted changes are the user's to commit first; never stash or discard them.
3. Run the script with `--dry-run` and show the range it found and the files it will change. A devroot without `.devroot-version` resolves its base from the initial commit's date; say which commit that chose, and offer `--from <sha>` if the user knows better.
4. Run it for real. On exit 0, it has committed. On exit 3, list the conflicted files it named, resolve each with the user, keeping their intent where the template and their edit overlap, then `git add` and commit with the title the script printed; `git reset --hard HEAD` abandons the run.
5. Run `npx skills update -y` from the devroot root, so the skills installed from `huntie/skills` move too, and report what changed. The huntiestack skills themselves, this one included, are global: suggest `npx skills update -g` when they look stale.

End with the update commit, the template range it covered, and what the skills update changed.
