# The `dev` command: run a devroot script, or jump into the workspace, from
# anywhere.
#
#   dev                                cd to the workspace root
#   dev help                           index of the devroot scripts
#   dev checkout react/react-native    run scripts/checkout
#   dev react-native                   cd to projects/react-native
#
# Installed by scripts/setup as a symlink into ~/.config/fish/functions. The
# root comes from $DEVROOT when the shell config sets it, else from this
# file's real location, captured when fish sources the file — the one moment
# `status filename` names it.

if not set -q DEVROOT
  set -g DEVROOT (path dirname (path dirname (path resolve (status filename))))
end

function dev --description 'Run a devroot script or jump into the workspace'
  if test (count $argv) -eq 0
    cd $DEVROOT
    return 0
  end

  set -l script $DEVROOT/scripts/$argv[1]
  if test -x $script
    $script $argv[2..]
    return $status
  end

  if test -d $DEVROOT/projects/$argv[1]
    cd $DEVROOT/projects/$argv[1]
    return 0
  end

  set -l names
  for f in $DEVROOT/scripts/*
    test -x $f; and set -a names (path basename $f)
  end
  echo "dev: no script or checkout '$argv[1]' in $DEVROOT" >&2
  echo "     scripts: $names" >&2
  return 2
end
