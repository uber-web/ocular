# ocular-publish

Publish the packages, create git tag and push.

## Usage

This script will usually be mapped to `publish`:
```bash
yarn publish [mode] [npm-tag]
```

To run it directly
```bash
npx ocular-publish [mode] [npm-tag]
```

## mode

- `beta` - bump pre-release version and publish with beta flag.
- `prod` - bump patch version and publish.

## npm-tag

Custom tag for the release. If not specified, the release is tagged with `beta` if `mode: beta` and `latest` if `mode: prod`.
