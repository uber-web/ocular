# ocular-publish

Publish the packages, create git tag and push.

## Usage

This script will usually be mapped to `publish`:
```bash
yarn publish [mode]
```

To run it directly
```bash
npx ocular-publish [mode]
```

## Modes

- `beta` - bump pre-release version and publish with beta flag.
- `prod` - bump patch version and publish.
