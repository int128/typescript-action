# typescript-action [![ts](https://github.com/int128/typescript-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/typescript-action/actions/workflows/ts.yaml)

This is a template of GitHub Actions written in TypeScript.


## Getting Started

To run this action, create a workflow as follows:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: int128/typescript-action@v1
        with:
          name: hello
```


## Specification

### Inputs

| Name | Default | Description
|------|----------|------------
| `name` | (required) | example input


### Outputs

| Name | Description
|------|------------
| `example` | example output


## Development

### Release workflow

When a pull request is merged into main branch, a new minor release is created by GitHub Actions.
See https://github.com/int128/release-typescript-action for details.

### Dependency update

You can enable Renovate to update the dependencies.
This repository is shipped with the config https://github.com/int128/typescript-action-renovate-config.
