#!/bin/bash

nvm use v10.14.1
git pull origin master
yarn
yarn build
pm2 restart $0
