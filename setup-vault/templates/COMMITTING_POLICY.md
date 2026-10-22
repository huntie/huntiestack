# Committing policy

This directory is a git repository of its own, on `main` only, edited from several machines and by several sessions at once. Its history is both the record and the sync mechanism, so every session commits as it goes and never leaves a write here uncommitted.

- **Rebase before writing.** Run `git -C vault pull --rebase --autostash` before the first write of a task. The session-start hook does this once when a session opens; in a long session, do it again before a write.
- **Commit each write at once.** One commit per filed item: a plan created or updated, a decision appended, a lesson filed. Do not batch across tasks, and do not leave a write for the user to commit. The title names the area first, then the change: `plans: Add 004 react-native flake detection`, `devroot: Record the vault commit policy`, `react-native-website: Trim the showcase note`. No trailers; signing is whatever git is configured to do.
- **Push straight after.** Run `git -C vault push`. If the push is rejected, pull with rebase and push again. The one conflict this layout expects is two machines allocating the same plan number in `index.md`; the later one renumbers its plan and retries.
- **Never rewrite history here.** No amend after a push, no force push, no branches. A wrong note is fixed by a new commit.
- **Commit only vault content.** Editor and tool state such as `.obsidian/` and `.cogito-folder.json` is covered by `.gitignore`; extend that file rather than committing such state.
- **Offline is fine.** Commit anyway and push when the network returns. The pull at the next session start reconciles.
