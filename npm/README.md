# `npx huntiestack` (installer)

Shortcut for installing [huntiestack](https://github.com/huntie/huntiestack) via `npx skills`. It installs the setup skills (`/setup-devroot`, `/setup-vault`, and `/update-devroot`) to your home directory.

## Usage

```sh
npx huntiestack
```

Follow prompts, then open your agent and run `/setup-devroot`.

## Requirements

macOS or Linux, and Node.js 22.20 or later.

## Publishing

Bump `version` in `package.json` and land it on `main`. The [Publish npm package](../.github/workflows/publish-npm.yml) workflow publishes any version not yet on npm, through npm trusted publishing (no token).
