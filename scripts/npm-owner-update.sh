#!/bin/sh
set -e

cat NPM_OWNERS
read -p "Do you want to add the above owners to all packages (y/n)? " confirm

if [ "$confirm" != "y" ]; then
  echo "Ok bye."
  exit 0
fi

while read username
do
  for f in packages/*; do
    package=`basename $f`

    if [ -d "$f" ] && [ -e "$f/package.json" ]; then
      echo "Adding $username to $package."
      npm owner add $username $package
    fi
  done
done < NPM_OWNERS

echo "Success."
