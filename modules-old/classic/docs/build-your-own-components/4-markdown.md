# Markdown component

The markdown component transforms a string in markdown format and renders a documentation page.

The [Documentation Routes](../routes-and-links-in-ocular/2-documentation-routes.md) article has all the details for turning a set of markdown files into full-fledged documentation pages.

Here is a [refresher on Markdown syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

The markdown component does two other things beyond rendering markdown file: code highlighting and component embedding.

## Code highlighting

You can use code snippets in your markdown file, either inline by surrounding the code in pairs of backticks (\`), or by fencing your code by lines with three backticks (\`\`\`).

Ocular will then use syntax highlighting through [Prism](http://prismjs.com/) to enhance the presentation of the code.

## component embedding

You can also embed custom code in your Markdown page. To do that, you must first reference your embedded component in __/src/demos.js/__. Then, you must inject your component by writing:
```<!–– INJECT:"[your component name]" [options] -->```

### demos.js

demos.js simply is a central place from where all the components to be embedded are exported. It's a file of the form:

```
import myAwesomeComponent from '/demos/my-awesome-component';
import coolComponeent from '/demos/cool-compoent';

export default {
  myAwesomeComponent,
  coolComponent
};
```

Once this is done, the corresponding components can be used in the INJECT token by using their name. (ie INJECT:"myAwesomeComponent", etc.)

### Component embedding options

before closing hte INJECT token you can add on optional keyword.

- inline: the embedded component will be inline with the text. You can have text afterwards;
- heading: the embedded component will be at the top of the page (no matter where you put it in your markdown document)
- fullscreen: the embedded document will occupy the whole screen.
