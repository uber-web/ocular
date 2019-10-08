# ocular-bump

```bash
ocular-bump [package_name]
ocular-bump [package_name]=beta
ocular-bump [package_name]=[target_version]
```
This script helps replace packages with specified version inside a repo. Replace the dependency with the target version of all the `package.json` files under directories `root`.

For convenience, the following monorepos can use name shortcut to bump all the modules to the same version. 

- deck.gl: `ocular-bump deck` or `ocular-bump deck=beta`
- luma.gl: `ocular-bump luma` or `ocular-bump luma=beta`
- math.gl: `ocular-bump math` or `ocular-bump math=beta`
- probe.gl: `ocular-bump probe` or `ocular-bump probe=beta`

## Examples 

```shell script

# deck.gl, luma.gl, math.gl, probe.gl
ocular-bump luma # default to latest
ocular-bump luma=latest
ocular-bump deck=beta luma=beta
ocular-bump math=3.0.0

# other package
ocular-bump babel-loader # =latest, =beta, =1.0.0
```
