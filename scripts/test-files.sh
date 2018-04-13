#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..

normalize() {
  node -e "console.log(require('path').normalize('$1'))"
}

PACKAGES_DIR=$(normalize $(pwd)/packages/)

FILES=""

for _file in $@; do
  file=$(normalize $_file)
  if [[ "${file##${PACKAGES_DIR}}" != "$file" ]]; then
    FILES="$FILES $(dirname $(dirname $file))"
  fi
done

yarn test --passWithNoTests $FILES
