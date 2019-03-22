## Download

This project includes submodules, to clone with submodules use the following command:

```bash

git clone --recurse-submodules git@github.com:code-ninja/cristinavillas.git <target-folder>

```

## Installation

1. Install using yarn, and then run migration script

```bash

yarn

```

2. Run in dev mode using

```bash

yarn dev

```

3. Production deployment

```bash
nvm use v10.14.1
git pull origin master
yarn
yarn build
pm2 start npm --name "your-app-alias" -- start

```

4. Production updating

```bash
nvm use v10.14.1
git pull origin master
yarn
yarn build
pm2 restart "your-app-alias"

```
