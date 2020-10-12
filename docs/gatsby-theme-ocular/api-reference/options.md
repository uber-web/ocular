# Options

Like all gatsby themes and plugins, `gatsby-theme-ocular` accepts an options object.

`gatsby-config.js`:
```js
module.exports = {
  plugins: [{resolve: `gatsby-theme-ocular`, options: {...}],
};
```

The following options are available:

| Configuration      | Type | Description |
| --- | --- | --- |
| `PROJECT_TYPE`     | `String` | Should be set to `"github"` if your project is hosted on GitHub. `GITHUB_KEY` (below) must be provided so the site can display star counts and contributors. |
| `PROJECT_NAME`     | `String` | The project's name (on github). |
| `PROJECT_ORG`      | `String` | The project's GitHub organization. |
| `PROJECT_ORG_LOGO`     | `String`  | URL to an image of the organization's logo. |
| `PROJECT_URL`      | `String` | The project's URL |
| `PROJECT_DESC`     | `String` | The project's description |
| `PROJECT_IMAGE`    | `String` | Featured image of the project |
| `PROJECTS`         | `Array`  | Array of links to related projects (header) |
| `PATH_PREFIX`        | `String` | Subdirectory in which the site will be hosted, e.g. `'/site'`. Note that `gatsby` must be run with the `--prefix-paths` option for this to work.|
| `HOME_PATH`        | `String` | Path to be removed in the relative path. If it equals `'docs'`, docs page will be the home page. If present, no other home page is generated. It defaults to `''` (empty string). |
| `PAGES`     | `Array`  | See below |
| `HEADER_LINK_URL`        | `String` | Link that will be added on the anchor used for the header logo. It defaults to `/` if it's not defined.|
| `ADDITIONAL_LINKS` | `Array` | See below |
| `GA_TRACKING_ID`      | `String` | Google analytics tracking ID |
| `GITHUB_KEY`       | `String` | The GitHub key for showing star counts and contributors. The value should be like `btoa('YourUsername:YourKey')` and the key should have readonly access. | |
| `EXAMPLES`         | `Array` | See below |
| `STYLESHEETS`      | `Array` | Additional CSS stylesheets |
| `INDEX_PAGE_URL` | `String`  | Optional URL to a replacement component for the home page. |
| `DOC_MARKDOWN_PAGE_URL` | `String`  | Optional URL to a replacement component for doc pages. |
| `DOC_FOLDERS` | `Array`  | A set of paths to the doc folders to source all markdown files. |
| `CODESANDBOX_FOLDER` | `String`  | Root directory for the CodeSandbox examples. Used in markdown with `[embedded example](embedded-codesandbox://example1)`, where `example1` folder must be in the root directory listed here. |
| `EXAMPLE_GALLERY_PAGE_URL` | `String`  | Optional URL to a replacement component for the example gallery page (`/examples`). |
| `EXAMPLE_PAGE_URL` | `String`  | Optional URL to a replacement component for the default example page. Normally `EXAMPLES[].componentUrl` is used instead. |
| `WEBPACK_ALIAS` | `Object` | Optional map that will be added to webpack aliases |
| `WEBPACK_INCLUDE_REGEXP` | `Object` | Regexp (applies to file paths). Use to defeat loader excludes in default gatsby webpack config |
| `WEBPACK_EXCLUDE_REGEXP` | `Object` | Regexp (applies to file paths). Use to exclude specific files in default gatsby webpack config |

## PROJECTS

Projects are links to related projects in the header drop down menu.

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `name`    | `String` | The header of the link |
| `url`    | `String` | The URL of the link |

## PAGES

Pages to render. If `componentUrl` is supplied, the page is rendered with the React component. If `content` is supplied, the page is generated from Markdown.

Use `path: '/'` to customize the home page.

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `path`    | `String` | The path to the page |
| `componentUrl`    | `String` | The URL of the React component |
| `content`    | `String` | The URL of the markdown |

## ADDITIONAL_LINKS

You can add additional links in the header section. These links will be added after the default menu.
Each link entry has the following fields:

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `name`    | `String` | Required. The displayed text in the header link. |
| `href`    | `String` | Required. The hyperlink you want to redirect to. This can be internal or external link. |
| `classnames` | `String` | Optional. The classname of the header link.
| `index`      | `Int`    | Optional. Use 0 to push before first item. |


## EXAMPLES

Each EXAMPLE entry has the following fields

| Field          | Type     | Name  |
| ---            | ---      | ---   |
| `componentUrl` | `String` | The filename of a React (`.jsx`) file |
| `category`     | `String` | If provided, the examples will be grouped by category name. |
| `title`        | `String` | The title of example. |
| `image`        | `String` | The icon for the bullet. Typically `images/<example-screenshot>.png`. Images are resolved in the `static` folder. (Right now only support png files) |
| `path`         | `String` | The relative URL of the example in the website, typically `example/example-name` |
