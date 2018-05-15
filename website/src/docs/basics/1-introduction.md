# Introduction

Ocular is a framework to generate documentation websites. 

Simply write your documentation in markdown files, organize them in folders as you see fit, run a couple of scripts: your website is ready to go without having to write a single line of code.

If you want to customize it, beyond changing the styling, you can write your own components to replace whatever feature of ocular you want to change. 

Under the hood, an ocular website is its own standalone application built with Webpack, and its main idea relies on how Webpack handles [module resolution](https://webpack.js.org/concepts/module-resolution/). The Ocular library comes with several components for different parts or features of the website (ie a home page component, a header component, etc.). You can provide our own version of these components, if you do, the components you wrote are going to be taken into account, and if you don't, Ocular will use its own version of that compoent. 

We built Ocular as a way to organize documentation for our open source projects on GitHub, and that's the main use case. See for instance [React Vis](https://uber.github.io/react-vis/documentation/welcome-to-react-vis) or [Luma.gl](luma.gl). But Ocular's flexibility and the ease with which it works with markdown files allowed us to create other websites such as [vis.academy](http://vis.academy) or [vis.gl](http://vis.gl). 

Happy documenting!
