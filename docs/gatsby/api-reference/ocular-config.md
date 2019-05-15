# Configuration Reference

| Configuration      | Type | Description |
| --- | --- | --- |
| `PROJECT_TYPE`     | `String` | Should be set to `"github"` if your project is hosted on Github. `GITHUB_KEY` (below) must be provided so the site can display star counts and contributors. |
| `PROJECT_NAME`     | `String` | The project's name (on github). |
| `PROJECT_ORG`      | `String` | The project's Github organization. |
| `PROJECT_URL`      | `String` | The project's URL |
| `PROJECT_DESC`     | `String` | The project's description |
| `PROJECTS`         | `Array`  | Array of links to related projects (header) |
| `HOME_PATH`        | `String` | |
| `HOME_HEADING`     | `String` | |
| `HOME_RIGHT`       | `String` | |
| `HOME_BULLETS`     | `Array`  | See below |
| `ADDITIONAL_LINKS` | `Array` | See below |
| `GA_TRACKING`      | `String` | |
| `GITHUB_KEY`       | `String` | The Github key for showing star counts and contributors. The value should be like `btoa('YourUsername:YourKey')` and the key should have readonly access. | |
| `EXAMPLES`         | `Array` | See below |
| `INDEX_PAGE_URL` | `String`  | Optional URL to a replacement component for the home page. |
| `DOC_PAGE_URL` | `String`  | Optional URL to a replacement component for doc pages. |
| `EXAMPLE_GALLERY_PAGE_URL` | `String`  | Optional URL to a replacement component for the example gallery page (`/examples`). |
| `EXAMPLE_PAGE_URL` | `String`  | Optional URL to a replacement component for the default example page. Normally `EXAMPLES[].componentUrl` is used instead. |

## PROJECTS

Projects are links to related projects in the header drop down menu.

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `title`    | `String` | The header of the link |
| `url`    | `String` | The URL of the link |


## HOME BULLETS

These are bullets on the home page, typically the main selling points of your framework:

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `text`    | `String` | The header of the bullet point |
| `desc`    | `String` | The text of the bullet point |
| `image`   | `String` | The icon for the bullet. Typically `images/<icon>.svg`. Images are resolved in the `static` folder. |

## ADDITIONAL_LINKS

You can add additional links in the header section. These links will be added after the default menu.
Each link entry has the following fields:

| Field     | Type     | Name  |
| ---       | ---      | ---   |
| `name`    | `String` | Required. The displayed text in the header link. |
| `href`    | `String` | Optional. The hyperlink you want to redirect to. |
| `to`   | `String` | Optional. The path to an internal gatsby page. Each entry will either only has `href` or `to`. |
| `classnames` | `String` | Optional. The classname of the header link.


## EXAMPLES

Each EXAMPLE entry has the following fields

| Field          | Type     | Name  |
| ---            | ---      | ---   |
| `componentUrl` | `String` | The filename of a React (`.jsx`) file |
| `title`        | `String` | The title of example. |
| `image`        | `String` | The icon for the bullet. Typically `images/<example-screenshot>.png`. Images are resolved in the `static` folder. (Right now only support png files) |
| `path`         | `String` | The relative URL of the example in the website, typically `example/example-name` |
