# bump

This script helps replace packages with specified version inside a repo. Replace the dependency with the target version under directories `root` and `website, modules, examples`.

For convenience, the following monorepos can use name shortcut to bump all the modules to the same version. 

- deck.gl: `node bump.js deck` or `node bump.js deck=beta`
- luma.gl: `node bump.js luma` or `node bump.js luma=beta`
- math.gl: `node bump.js math` or `node bump.js math=beta`
- probe.gl: `node bump.js probe` or `node bump.js probe=beta`

## Usage

```shell script

# deck.gl, luma.gl, math.gl, probe.gl
node bump.js luma # default to latest
node bump.js luma=latest
node bump.js deck=beta luma=beta
node bump.js math=3.0.0

# other package
node bump.js <pacakge-name> # =latest, =beta, =1.0.0
```
