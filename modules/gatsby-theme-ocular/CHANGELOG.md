# CHANGELOG (gatsby-theme-ocular)

##

- fix(gatsby): Ignore tsconfig.json (#379)
- chore(gatsby): Reorder page title (#377)
- chore: align gatsby module with dev-tools (#359)


## 1.2.4

- Fix `createDocPages` not returning a Promise (#342)
- Fix table of contents backfill when `HOME_PATH` is used (#342)

## v1.2.3

- Fix page styling on mobile (#337)
- fix link mapping from README.md (#338)

## v1.2.2

- Added CodeSandbox plugin to support interactive code examples (#331)
- Expanded the theme config with `HEADER_LINK_URL` field to add a link (internal or external) on the header logo (#332)
- Expanded the theme config with `HOME_PATH` field to allow using existing markdown page as index page (#333)

## v1.2.1

- Fix TOC expansion in examples page (#319)

## v1.2.0

- More descriptive page titles (#318)

## v1.2.0-beta.13

- Support grouped examples (#317)

## v1.2.0-beta.12

- [gatsby-theme-ocular] Remove unused dependencies (#316)
- Fix google analytics (#315)

## v1.2.0-beta.11

- [gatsby-theme-ocular] Fix SEO headers (#314)

## v1.2.0-beta.10

- [gatsby-theme-ocular] styling and compatibility (#313)

## v1.2.0-beta.9

- Support MDX (#312)

## v1.2.0-beta.7

- Fix graphql type definition

## v1.2.0-beta.6

- Fix relative path in stylesheets (#297)

## v1.2.0-beta.5

- [gatsby-theme-ocular] Sanitize anchor ids (#296)
- [gatsby-theme-ocular] Various fixes: search, path prefix, anchor position (#295)

## v1.2.0-beta.4

- Fix gatsby build (#294)

## v1.2.0-beta.3

- Fix InfoPanel styling bug

## v1.2.0-beta.2

- Add InfoPanel styling (#293)

## v1.2.0-beta.1

- Fix Search styling

## v1.2.0-alpha.2

- Fix table of contents parsing (#291)
- Fix UI bugs

## v1.2.0-alpha.1

- UI bug fixes (#290)

## v1.2.0-alpha.0

- Clean up gatsby-theme-ocular (#288)

## v1.1.0

## v1.1.0-alpha.4

- Fixes custom index page (by ensuring ocularOptions are plumbed through to page creation functions).
- Improved logging of page creation

## v1.1.0-alpha.3

- Fixes support for multiple doc directories, removes need to add ignores to gatsby-config.js

## v1.1.0-alpha.2

Fixes

## v1.1.0-alpha.1

Refactor config handling:

- Removes need for `ocular-config.js`: config goes into the theme in the normal `gatsby-config.js`.
- Removes need for `gatsby-node.js` in most websites, meaning that most websites can just have a `gatsby-config.js`

## v1.0.3

## v1.0.2

## v1.0.1

- Fix npmjs.org READMEs

## v1.0.0

First publish of ocular-gatsby repackaged as a theme

- Removes need for `gatsby-browser.js` and `gatsby-ssr.js` in most websites.

# CHANGELOG (ocular-gatsby)

## v1.0.0-alpha.28

- FIX: Layout issues when navigating directly to doc page
