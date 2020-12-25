# Welcome

ocular is a set of tools to help build and publish open source frameworks. It contains:
- a `dev-tools` module that installs and provides base configurations for tools like webpack, babel, lerna, eslint prettier etc.
- a `gatsby-theme-ocular` module that contains a markdown to HTML converter to make it easy to build websites.
## About ocular-dev-tools

ocular-dev-tools installs a set of configurable development scripts to handle build, test and publish tasks for JavaScript framework repositories.

While highly configurable ocular-dev-tools is very opinionated in choice of tooling etc, and mainly targets vis.gl frameworks, like deck.gl, luma.gl etc.

## About gatsby-theme-ocular

The vis.gl team needed a system to build documentation websites with the least amount of friction. Our first use case has been the websites for the various visualization projects such as [deck.gl](https://deck.gl) [luma.gl](https://luma.gl) or [loaders.gl](https://loaders.gl). 

We wanted: 
- to organize documentation files with a table of contents, navigation and search;
- to have interactive examples;
- to have some control on formatting;
- to generate websites discoverable by search engines;
- to make it easy to publish these websites, especially on github pages;
- to make this experience possible without writing a line of code;
- to provide sensible defaults in terms of navigation and styling;
- but to allow advanced users to overwrite and customize anything they want. 

Happy documenting!

To find out more, go to [get started](get-started.md)

