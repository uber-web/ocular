# Presenting Ocular's base components

## Families of components

Ocular provide certain components out of the box.

These components can be grouped in several families:

- the [App](./2-app/app-js) family, components which are used at the top level of your ocular website and are always present on your page;
- the [Home](./3-home/home-js) family, which are building blocks for the home page of your ocular website;
- the [Markdown](./markdown-component) component, how Ocular renders a documentation page;
- the [Search](./search) component, how Ocular handles searching;
- the Templates family, which are building blocks you can use for building whatever you want.

## Importing components

Ocular doesn't "export" components. Instead, it uses Webpack [module resolution](https://webpack.js.org/concepts/module-resolution/).

When Ocular needs a file, it first looks for it in the __/src__ folder. If it can't find it, it will look for it in __/node_modules/__, failing that, in the __/base/__ folder of the Ocular module, and finally in the __/node_modules/__ of the Ocular module.

All the components described above exist in the __/base/components/__ folder of the Ocular module.
Instead of using these default components, you can create your own version in __/src/components/__, and your version will override the default one.

If you create a custom component in __/src/components/__, you can import any of Ocular's default components as if they were in the same folder.

For instance, let's create a new version of the Home component in __/src/components/__

Home.js
```
import Footer from 'Footer';

export default function Home() {
  return (<div>
    <div>Welcome to my Ocular website</div>
    <Footer />
  </div>);
}
```

This will work even if there is no Footer.js file in __/src/components/__, because webpack can just use the default Footer component in the __/base/__ folder of the Ocular module. However, if you create a Footer.js file in __/src/components/__, it will be that file that will be used instead of the default version.
