#!/bin/bash

case $CIRCLE_NODE_INDEX in
  0)
    node smoke/run.js html-minifier
  ;;
  1)
    node smoke/run.js jquery
  ;;
  2)
    node smoke/run.js lodash
  ;;
  3)
    echo "Nothing to run"
  ;;
  *)
    echo "Cannot run outside CircleCI environment"
    exit 1
  ;;
esac
