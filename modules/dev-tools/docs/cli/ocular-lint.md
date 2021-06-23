# ocular-lint

Run eslint & prettier on the code base.

```bash
ocular-lint [mode]
```

## Modes

- `full` (default) - run on all files.
- `pre-commit` - only run on changed files since the last commit.
- `fix` - run prettier and eslint --fix on all files.

## Configuration

[Configurations](#ocular-dev-tools-1): `lint`
