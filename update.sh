#!/bin/bash

if [ -z "$0" ]
then
  exit 1
fi
nvm use v10.14.1 && git pull origin master && yarn && yarn build && pm2 restart $0
