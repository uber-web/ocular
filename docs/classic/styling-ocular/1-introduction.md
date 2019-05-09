# Introduction to styling

Just like with [components](./build-your-own-components/1-presenting-base-components.md), Ocular relies on Webpack [module resolution](https://webpack.js.org/concepts/module-resolution/) for styling. 

Out of the box, styling is achieved through a set of scss modules. You can overwrite any of these modules with your own version by creating a file of the same name in __/src/styles/__. If you don't, Ocular will use the default version of this file. 

When you create an Ocular project, two files are created in __/src/styles/__ for easier customization: __\_variables.scss__ and __index.scss__ (the latter being initially empty). Those files will be taken into account when compiling styles. 

__\_variables.scss__ contains variable names, for instance the colors and the fonts used in the website. Edit it to change it all at once. __index.scss__ allows you to override any single property of the website without having to replace an existing style file. 
