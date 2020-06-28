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
| `PROJECT_TYPE`     | `String` | Should be set to `"github"` if your project is hosted on Github. `GITHUB_KEY` (below) must be provided so the site can display star counts and contributors. |
| `PROJECT_NAME`     | `String` | The project's name (on github). |
| `PROJECT_ORG`      | `String` | The project's Github organization. |
| `PROJECT_ORG_LOGO`     | `String`  | URL to an image of the organization's logo. |
| `PROJECT_URL`      | `String` | The project's URL |
| `PROJECT_DESC`     | `String` | The project's description |
| `PROJECT_IMAGE`    | `String` | Featured image of the project |
| `PROJECTS`         | `Array`  | Array of links to related projects (header) |
| `PATH_PREFIX`        | `String` | Subdirectory in which the site will be hosted, e.g. `'/site'`. Note that `gatsby` must be run with the `--prefix-paths` option for this to work.|
| `HOME_PATH`        | `String` | |
| `PAGES`     | `Array`  | See below |
| `ADDITIONAL_LINKS` | `Array` | See below |
| `GA_TRACKING_ID`      | `String` | Google analytics tracking ID |
| `GITHUB_KEY`       | `String` | The Github key for showing star counts and contributors. The value should be like `btoa('YourUsername:YourKey')` and the key should have readonly access. | |
| `EXAMPLES`         | `Array` | See below |
| `STYLESHEETS`      | `Array` | Additional CSS stylesheets |
| `INDEX_PAGE_URL` | `String`  | Optional URL to a replacement component for the home page. |
| `DOC_MARKDOWN_PAGE_URL` | `String`  | Optional URL to a replacement component for doc pages. |
| `DOC_FOLDERS` | `Array`  | A set of paths to the doc folders to source all markdown files. |
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
| `href`    | `String` | Optional. The hyperlink you want to redirect to. |
| `to`   | `String` | Optional. The path to an internal gatsby page. Each entry will either only has `href` or `to`. |
| `classnames` | `String` | Optional. The classname of the header link.
| `index`      | `Int`    | Optional. Use 0 to push before first item. |


## EXAMPLES

Each EXAMPLE entry has the following fields

| Field          | Type     | Name  |
| ---            | ---      | ---   |
| `componentUrl` | `String` | The filename of a React (`.jsx`) file |
| `title`        | `String` | The title of example. |
| `image`        | `String` | The icon for the bullet. Typically `images/<example-screenshot>.png`. Images are resolved in the `static` folder. (Right now only support png files) |
| `path`         | `String` | The relative URL of the example in the website, typically `example/example-name` |
