## Download

This project includes submodules, to clone with submodules use the following command:

```bash

git clone --recurse-submodules git@github.com:code-ninja/cristinavillas.git <target-folder>

```

## Configuration

1. Create config file in root folder using config.SAMPLE.json as pattern, save as config.development.json for development settings and config.production.json for production
  - See https://docs.ghost.org/docs/config for details
2. Create content folder in root, create data folder under content.

## Installation

1. Install using yarn, and then run migration script

```bash

yarn
yarn migrate

```

2. Run in dev mode using

```bash

yarn dev

```

3. Run in production using

```bash

yarn start

```
