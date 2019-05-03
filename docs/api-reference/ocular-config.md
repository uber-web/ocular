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
| `ADDITIONAL_LINKS` | `String` | |
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

## EXAMPLES

Each EXAMPLE entry has the following fields

| Field          | Type     | Name  |
| ---            | ---      | ---   |
| `componentUrl` | `String` | The filename of a React (`.jsx`) file |
| `title`        | `String` | The title of example. |
| `image`        | `String` | The icon for the bullet. Typically `images/<example-screenshot>.png`. Images are resolved in the `static` folder. |
| `path`         | `String` | The relative URL of the example in the website, typically `example/example-name` |
