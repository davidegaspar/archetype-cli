# archetype-cli

Model to create a Command Line Interface in NodeJS.

## Features

- display git metadata
- ejs rendering based on prompts and metadata
- prompts with saving
- nice spinners
- logging

## Usage

```sh
npm install -g arc
arc help
```

## Local development

```sh
npm install
npm link
arc help
arc git-info
arc -d render-templates -o=out
```

## Next

- display more git meta?
