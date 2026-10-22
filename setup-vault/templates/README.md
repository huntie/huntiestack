# Vault

Knowledge store for the devroot workspace — a shared brain holding plans, user context, and working knowledge that span over sessions and checkouts.

**This is a private repo per user.**

Start at [index.md](index.md), which links every file here.

This directory is a repository root, so nothing in it links outside by relative path.

<!-- setup-vault:begin -->
## Layout

```
vault/
├── README.md        # This file
├── COMMITTING_POLICY.md  # How sessions commit here: rebase first, one commit per write, push at once
├── index.md         # Recall surface: the plan checklist plus a link to every knowledge file
├── plans/
│   ├── NNN-<repo>-<slug>/
│   │   └── overview.md
│   └── _archive/    # Finished plans, moved here whole
└── memory/          # What sessions should remember that is not yet, or cannot be, a skill or code
    ├── <repo>/      # Per-repo overlay: what that repo's own agent instructions would say if they could
    └── <rule>.md    # Workspace-wide rules and prototype skills, until they are promoted to skills/
```

- **A plan** is a working document for work that spans more than one session. It starts, grows phase or research files beside `overview.md`, finishes, and is archived.
- **Memory** is what a session should remember that is not yet, or cannot be, code or a skill. A note under `memory/<repo>/` is what that repo's own agent instructions would carry if they could, where `<repo>` is the checkout name under `projects/`, or `devroot` for this workspace itself; a file directly under `memory/` is a workspace-wide rule or a prototype skill. Both have an exit: a line the repo would take goes upstream, and a rule that proves itself is promoted to `skills/`.

## When to write

Every session reads this directory, so low-quality or speculative content degrades everything downstream. Before writing, ask whether the note will change what a future session does on a different task. If the answer is not a clear yes, do not write it. The one-line form: would this go into the prompt for a different task? Most tasks teach nothing worth carrying, and writing nothing is the default. Sessions do not write here in passing: decisions and lessons are filed through `/reflect`, which runs at the end of a task only on a trigger it names, and plans through `/plan`. When something does clear the bar, edit an existing note before adding one, and commit it at once, per [COMMITTING_POLICY.md](COMMITTING_POLICY.md).

A worked example calibrates the bar. A note on adding an app to a website's showcase once ran to fifteen dense lines: the JSON keys, the pinned-entry filter, the icon corner radius, the App Store artwork URL. All of that is a few minutes of reading in the checkout, so none of it clears the bar. Two things did: the showcase grid is client-rendered, so grepping the built site for a new entry proves nothing, and the build needs a corepack install first, which the error does not say. The note is now those two lines.

- **A decision** that changed how a repo's setup or workflow works: append a dated section to `memory/<repo>/decisions.md`, stating the decision as it stands and why.
- **A non-obvious gotcha** that cost real time and cannot be rederived from the code: one file under `memory/<repo>/`, named for the lesson (`worktree-gotchas.md`), plus a line in the index. Agent auto-memory stays for per-machine, per-agent conveniences; anything worth carrying across machines or agents goes here.
- **Work spanning more than one session**: a plan.

## Plans

- Numbers are three (and when needed, four) digits, zero padded, allocated from the index: the next number is the highest listed plus one. Numbers are never reused, so `plan 007` is a stable handle in commits and links.
- The slug is `NNN-<repo>-<what>`. Drop the repo segment for workspace-wide plans; a plan spanning several repos names the primary one.
- A plan is always a directory holding `overview.md`. Phase files and research sit beside it.
- Every plan is listed in the index with a checkbox. Done means the directory moves to `plans/_archive/` and the checkbox flips.
- A plan that lands code records its branch under a `**Branch:**` line in `overview.md`: one brief name, usually the plan's `<what>` segment, used in every checkout the plan touches. `scripts/checkout <owner/repo>@<name> --new` creates it; a resuming session lands on it with the same command without `--new`.
- The `**Status:**` line opens with one tag: `[planned, not started]`, `[in flight <branch>]`, `[verified, uncommitted]`, `[open PR #N]`, `[merged #N]`, or `[shelved]`. Recall reads the tag and checks it against git and GitHub, so keep it current as work moves.
- Steps are boxes that each name the evidence checking them, a file, a log line, a test run, or a SHA, and a box is checked only when that evidence exists. The index checkbox flips when every box has.

Links are ordinary relative Markdown links, so they render on GitHub and resolve for any agent.
<!-- setup-vault:end -->
