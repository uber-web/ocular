# RCF: Rebuild ocular on top of gatsby

Author: @jckr / @ibgreen
Date: Jan 2019
Status: Draft


## Requirements:

* Treat documentation as code
    * Build from checked-in markdown
* Handle examples
    * Build pages for examples (React and pure-js)
    * Inject examples from checked-in code.


## Static Website Generators

Gatsby - Written in React (Note: not a documentation generator for React) - A downside is extensive use of complicated JS ecosystem. Requires a high bar to learn, but overlaps with the front-end skills used by React developers.

Some strong alternatives
- Jekyll, written in Ruby.
- Hugo, is written in Go and uses Go's template libraries.

Some articles
- [Quick Thoughts on Gatsby JS vs. Jekyll](https://medium.com/@ajkueterman/quick-thoughts-on-gatsby-js-vs-jekyll-c13c1337c24a)
- [Gatsby vs Hugo article](https://medium.freecodecamp.org/gatsby-vs-hugo-a-detailed-comparison-e78d94f640fc)
- [Gatsby vs Jekyll vs Hugo forum](https://www.reddit.com/r/FreeCodeCamp/comments/923js6/jekyll_vs_hugo_vs_gatsby/)


## Markdown Support

Markdown support is very strong, handled through the remark based plugin which itself has an entire system of sub-plugins for code syntax formatting, image handling, etc. Also a number of styling sheets are available.

The main effort is deciding how to load all the markdown into gatsby, how to query it from the resulting graphql tables, and then generating table of contents, and styling the markdown.


## Code Injection Support

### Use Cases

* Examples need to be browsable from their own table of contents - Just publish examples as separate pages and use iframes?
* We want to be able to inject a code sample on a page


###Alternatives

#### repl (code sandbox) links

The gasby remark plugin [gatsby-remark-code-repls](https://www.gatsbyjs.org/packages/gatsby-remark-code-repls/) is an interesting of option for "REPL-type environments" (like codepen). This can POST example code from the repo to the codepen using the "Codepen Prefill API".
* See [React docs](https://reactjs.org/docs/rendering-elements.html) for example usage.

* Currently examples are not inline, the plugin generates links that open the code in the repl sandbox

COMMENT: Adding this feature is obviously extremely nice for any complete code snippets, but does not solve the example code injection problem as such


#### [gatsby-remark-responsive-iframe](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-responsive-iframe)

Another gatsby remark plugin, wraps iframes or objects (e.g. embedded YouTube videos) within markdown files in a responsive elastic container with a fixed aspect ratio. This ensures that the iframe or object will scale proportionally and to the full width of its container.
