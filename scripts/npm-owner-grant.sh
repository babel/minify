#!/bin/sh
set -e

read -p "Username: " username
read -p "Are you sure you want to add $username to all packages (y/n)? " confirm

if [ "$confirm" != "y" ]; then
  echo "Ok bye."
  exit 0
fi

for f in packages/*; do
  package=`basename $f`

  if [ -d "$f" ] && [ -e "$f/package.json" ]; then
    npm owner add $username $package
  fi
done

echo "$username" >> NPM_OWNERS

echo "Success."
