# Links between documentation pages

In addition to links in the [Header](/website/src/docs/reference/build-your-own-components/2-app/2-Header.md) (either [default](./default-links) or [custom](./additional-links)), you can have links in your documentation pages using the markdown syntax: 

```
[label of link](where the link points to)
```

That said, there are several ways the links can work.

| Case                                | Syntax                                                                                                            | Link                                                                                                       |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| External link                       | ```[Uber engineering blog](http://eng.uber.com)```                                                                | [Uber engineering blog](http://eng.uber.com)                                                               |
| Full link to a page within the site | ```[Ocular home page](https://uber-web.github.io/ocular/)```                                                      | [Ocular home page](https://uber-web.github.io/ocular/)                                                     |
| Absolute link to a markdown file    | ```[a link to this page] (/website/src/docs/reference/routes-and-links-in-ocular/6-links-between-documentation-pages.md)``` | [a link to this page](/website/src/docs/reference/routes-and-links-in-ocular/6-links-between-documentation-pages.md) |
| Relative link to a markdown file in same folder   | ```[Introduction](./introduction.md)```                                                                           | [Introduction](./introduction.md)                                                                          |
| Relative link to a markdown file in same folder, omitting ./   | ```[Introduction](introduction.md)```                                                                           | [Introduction](introduction.md)                                                                          |
| Relative link to a markdown file in a different folder   | ```[Getting started](../../basics/2-getting-started.md)```                                                                           | [Getting started](../../basics/2-getting-started.md)                                                                          |
| Relative link to a route            | ```[Introduction](./introduction)```                                                                              | [Introduction](./introduction)                                                                             |
| Another relative link to a route            | ```[Getting started](../../basics/quick-start)```                                                                              | [Getting started](../../basics/quick-start)                                                                             |

## Link to a full url

If you make your link point to a full url (ie 'http://eng.uber.com') then Ocular will not transform it. [Uber engineering blog](http://eng.uber.com)
```
[Uber engineering blog](http://eng.uber.com)
```

Note that you can also have full, absolute links pointing inside your documentation site.
[Ocular home page](https://uber-web.github.io/ocular/)
```
[Ocular home page](https://uber-web.github.io/ocular/)
```

## link to a markdown file

If, in your markdown files, you have a link to another markdown file, that link will still work from one Ocular page to another. The condition is that it your routes must have a fileLocation property documented. Note you have it automatically if you use [automatic route generation](/website/src/docs/reference/routes-and-links-in-ocular/2-documentation-routes.md)

This either works with absolute links (ie the whole path of the file is given, starting with a '/'), or with relative links (ie the path is relative to the directory of the source file). For files in the same directories, you can just use the file name directly without prefixing it with './'.

## link from a route to a route

Finally, you can use relative links from a route to a route. [Here's a link to the introduction page](./introduction) and its markdown equivalent: 
```
[Here's a link to the introduction page](./introduction)
```
These link will work in the Ocular pages even though they will not work in the source markdown documents.

## Which to use?

The distinction between file-to-file and route-to-route links is important because files and routes don't necessarily have the same in Ocular. 

Route-to-route links are conceptually simpler if you don't care / don't expose the source markdown files. 
They will still work if the underlying files change names. 

File-to-file links work both in the source material (ie if your source markdown files are in the /docs folder of your GitHub repository). Absolute file-to-file links can be copy/pasted around in various parts of your documentation. However these links will break if your file change names or locations. 
