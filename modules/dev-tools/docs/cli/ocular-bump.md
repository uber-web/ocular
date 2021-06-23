# ocular-bump

```bash
ocular-bump [package_name]
ocular-bump [package_name]=beta
ocular-bump [package_name]=[target_version]
```
This script helps replace packages with specified version inside a repo. Replace the dependency with the target version of all the `package.json` files under directories `root`.

For monerepos, you can use the package name to bump all the modules to the corresponding version.

Given a `package-name`, `modules` to bump are the results from `npm search [package-name]`

- deck.gl: `ocular-bump deck.gl` or `ocular-bump deck.gl=beta`
- luma.gl: `ocular-bump luma.gl` or `ocular-bump luma.gl=beta`
- math.gl: `ocular-bump math.gl` or `ocular-bump math.gl=beta`
- probe.gl: `ocular-bump probe.gl` or `ocular-bump probe.gl=beta`

## Examples

```shell script

# deck.gl, luma.gl, math.gl, probe.gl
ocular-bump luma.gl # default to latest
ocular-bump luma.gl=latest
ocular-bump deck.gl=beta luma.gl=beta
ocular-bump math.gl=3.0.0

# other package
ocular-bump babel-loader # =latest, =beta, =1.0.0
```
