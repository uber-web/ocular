# FAQ

## How to debug ocular builds

* Set `logLevel` in ocular-config.js, numbers between `1`-`4` give increasing levels of logging.

## ocular-gatsby technical issues

### site-query.jsx

The `src/components/site-query.jsx` file needs to be identical to the corresponding file in ocular-gatsby, to trigger graphql compilation. Do not modify this file.

### registerReactComponent

This was an older page customization mechanims. It is no longer supported. Remove, and use the `EXAMPLE.componentUrl` system instead.
