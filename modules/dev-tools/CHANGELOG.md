# CHANGELOG (ocular-dev-tools)

## v2.0.0-alpha.25

- Revert changes to headless mode

## v2.0.0-alpha.24

- feat(dev-tools): add ts-transform-remove-glsl-comments (#455)
- Add tests for TypeScript plugins (#452)
- chore(dev-tools): clean up package.json (#454)
- chore(test-utils): Migrate to typescript (#453)
- Use ocular-build to build dev-tools (#451)
- Add option to report code coverage against browser test (#450)
- fix: prettier log level (#449)

## v2.0.0-alpha.23

- Remove smoosh script (#448)
- Remove puppeteer global install (#447)

## v2.0.0-alpha.21

- ESM module build command improvements (#446)

## v2.0.0-alpha.20

- Bump major versions of tooling: prettier to 3.x, eslint to 8.5.x, typescript to 5.2.2 (#437)

## v2.0.0-alpha.19

- fix(dev-tools) use new headless mode in browser tests (#436)

## v2.0.0-alpha.18

- bundle command always merges babel config (#435)

## v2.0.0-alpha.17

- Add react support to dev bundle (#433)

## v2.0.0-alpha.16

- Minor fix of ESM resolution (#431)
- Change cjs entry point target (#432)

## v2.0.0-alpha.15

- Support building esm module with multiple entry points (#430)

## v2.0.0-alpha.14

- Update babel config for esm target (#429)

## v2.0.0-alpha.13

- Fix metrics import

## v2.0.0-alpha.12

- Start vite server from JS API (#424)

## v2.0.0-alpha.11

- Set NODE_ENV during test

## v2.0.0-alpha.10

- Bump esbuild plugins versions (#422)

## v2.0.0-alpha.9

- Fix umd bundle settings (#420)

## v2.0.0-alpha.8

- Fix test dist alias resolution (#418)

## v2.0.0-alpha.7

- clean up dependencies (#416)
- Remove shelljs (#415)

## v2.0.0-alpha.6

- Add ocular-bundle command (#414)

## v2.0.0-alpha.5

- Suppress commit hooks in lerna publish (#413)
- Add Typescript build commands (#412)
- eslintrc auto determine babel config path (#411)
- Drop import assertion for better compatibility (#410)

## v2.0.0-alpha.4

- support for ESM repos

## v2.0.0-alpha.3

- edge case handling and more flexible configs (#406)

## v2.0.0-alpha.2

- Try fix missing Chromium error

## v2.0.0-alpha.1

- Update test harness to use ts-node and vite #405

## v1.0.0-alpha.8

yarn 3 fixes

- fix: Fix error codes returned by ocular-test, ocular-lint, etc (fork#7)
    - Fix error codes returned by ocular-test, ocular-lint, etc
    - Drop node 12 from test matrix
- chore: Run bash scripts using Node (fork#6)
- Fix package.json format (fork#5)
- Remove browserslist update from bootstrap (fork#3)
- ESLint and prettier upgrade (fork#2)

## v1.0.0-alpha.7

- chore(dev-tools): dependencies (#374)

## v1.0.0-alpha.6

- feat(dev-tools): Add typescript build support (#372)
- chore: prettier fixes (#373)
- babel targets: explicit support for async functions in ESM, reduces runtime dependencies. (#366)
- chore(docs): Split docs per module (#371)
- feat(dev-tools): Partial webpack 5 support (#370)
- chore(dev-tools): update browser list on bootstrap (#367)
- chore(dev-tools): improve typings (#369)
- fix(dev-tools): Fix Node 16 build (#368)
- fix(dev-tools): For ES Modules, look also for .ocularrc.cjs (#365)

## v1.0.0-alpha.5

- feat(dev-tools): export getOcularConfig (#363)
- chore: Add github CI (#364)

## v1.0.0-alpha.4

- chore: Move deepmerge dep to dev-tools

## v1.0.0-alpha.3

- feat(dev-tools): Add typescript support (#361)

## v1.0.0-alpha.3

- feat(dev-tools): Add deepMerge export

## v1.0.0-alpha.1

- feat: ocular-tsify using ts-smoosh (#357)
- chore: Improve JSDoc (#354)
- feat: log commands issued by ocular (#353)
- feat: Add typescript exports for ocular functions, and test example (#352)

## v0.3.0

- Change build targets (#349)

## v0.2.3

- Fix coverage calculation (#348)

## v0.2.2

- Support custom tag in publish script (#347)

## v0.2.1

- Fix: extensions list from config wasn't used when executing ESLint (#345)

## v0.2.0

- Support `extensions` setting for Babel in config

## v0.1.8

- remove more jq usage

## v0.1.7

- remove dependency on jq (#302)

## v0.1.6

- dev-tools: Bump es6 build targets to Node 10 (#287)
- Fix eslint error when using 'ocular-lint fix' (#286)

## v0.1.5

- Fix bump script to detect peerDependencies (#284)

## v0.1.4

- Fix building selected modules (#282)

## v0.1.1

- Add `tape-promise` to dependencies

## v0.1.0

- Ensure `test` folder is published

## v0.0.33

- Fix bump script (#278)

## v0.0.32

- ocular-build: babel now called with --copy-files (#276)

## v0.0.31

- Update bump script to use full package name (#265)

## v0.0.30

- test assertions (#248)
- tweak build to accept options to build selected targets. (#251)
- Improve pre-commit lint script (#258)
- Fix warnings in switch case (#259)

## v0.0.29

- Fix targets

## v0.0.28

- Stricter es6 targets to avoid transforming async/await (#240)

## v0.0.27

- Report coverage using src (#209)

## v0.0.26

- Update publish script for unirepo (#201)

## v0.0.25

- Bump webpack-bundle-analyzer version (#192)
- Update Lerna version (#197)

## v0.0.24

- Only install one copy of chromium (#176)

## v0.0.23

- fix module aliasing for probe.gl (#158)

## v0.0.22

- Expose BrowserTestRunner configurations (#155)

## v0.0.21

- Remove hard reference of reify (#154)

## v0.0.20

- Fix build error when package.json is missing (#152)

## v0.0.19

- Upgrade to probe.gl@3.0.0

## v0.0.18

- Fix lint script (prettier error check)

## v0.0.17

- Monorepo publish now force publishes all packages, and uses exact dependencies

## v0.0.16

- Update lint script (#121)
- update publish script for unirepo (#122)

## v0.0.15

- Fix script shebangs (#120)

## v0.0.14

- Add auto aliases to module/test (#117)

## v0.0.13

- remove babel config override logic (#116)
- allow configs to be used outside of package root (#115)

## v0.0.12

- Fix bootstrap script

## v0.0.11

- Run coverage on ci (#112)
- Support babel/webpack config files in package (#113)
- Update documentation (#114)

## v0.0.10

- Move reify to peerDependency

## v0.0.8

- Fix publish script (#106)
- use prettier on markdowns (#102)
- add config system (#104)
- Add test harness (#105)
- Fix metrics collection (#107)
- Add user config for lint (#108)
- Fix coverage script (#111)

## v0.0.7

- Fix build script in Linux (#87)
- Remove puppeteer dependency (#88)

## v0.0.6

- Support monorepo in build & clean scripts (#86)
- Expose bootstrap script; consolidate monorepo scripts (#85)

## v0.0.5

- Remove transform-builtin-extend from common babel.config.js
