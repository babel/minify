#!/bin/bash

case $CIRCLE_NODE_INDEX in
  0)
    node smoke/run.js html-minifier
  ;;
  1)
    node smoke/run.js immutable-js
  ;;
  2)
    node smoke/run.js jquery
  ;;
  3)
    node smoke/run.js lodash
  ;;
  *)
    echo "Cannot run outside CircleCI environment"
    exit 1
  ;;
esac
