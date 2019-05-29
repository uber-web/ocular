# Generated Pages

Ocular gatsby programmatically generates pages at build time for docs and examples.  The configuration data used to generate the pages at build time
is made available to the page at runtime through the `pageContext` prop.

## Docs Pages

Doc pages are generated based on the contents of the `DOC_FOLDER` directory specified in `ocular-config.js`.

Page context:

| Configuration  | Type     | Description |
| ---            | ---      | --- |
| `toc`          | `String` | Type of table of contents used for page, 'docs' for doc page, 'examples' for example pages. |
| `slug`         | `String` | Title entry in the table of contents for the page. |
| `relativeLinks`| `Array`  | Mapping of relative to absolute links for all links on the page. |

## Example Gallery Page

An example gallery page is generated based on the contents of the `EXAMPLES` configuration value specified in `ocular-config.js`.

Page context:

| Configuration | Type     | Description |
| ---           | ---      | --- |
| `toc`         | `String` | Type of table of contents used for page, 'docs' for doc page, 'examples' for example pages. |
| `examples`    | `Array`  | Full list of example configurations from the `EXAMPLES` configuration value specified in `ocular-config.js`. |

## Example Pages

Example pages are generated based on the contents of the `EXAMPLES` configuration value specified in `ocular-config.js`.

Page context:

| Configuration   | Type     | Description |
| ---             | ---      | --- |
| `toc`           | `String` | Type of table of contents used for page, 'docs' for doc page, 'examples' for example pages. |
| `slug`          | `String` | Title entry in the table of contents for the page. |
| `exampleConfig` | `Object` | Individual example configuration from the `EXAMPLES` configuration value specified in `ocular-config.js`. |
