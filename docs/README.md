# Welcome


## Why Ocular?

We needed a system to build documentation websites with the least amount of friction. Our first use case has been the websites for the various visualization projects of Uber such as [Luma.gl](https://luma.gl) or [Loaders.gl](https://loaders.gl). 

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

> Note that there are two versions of ocular described in these docs! We are moving to the newer gatsby-based version of ocular. The "classic" variant is still documented for backwards compatibility, but will be removed as all frameworks migrate. The classic version is not maintained and new sites should be built using the gatsbyjs-based generator, you have been warned. .

## ocular-dev-tools

ocular-dev-tools installs a set of configurable development scripts to handle build, test and publish tasks for JavaScript framework repositories.

While highly configurable ocular-dev-tools is very opinionated in choice of tooling etc, and mainly targets vis.gl frameworks, like deck.gl, luma.gl etc.
