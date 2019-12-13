# Additional links

You can add links to external pages using the __/src/config.js__ file.

Find the line that says

```
export const ADDITIONAL_LINKS = []
```

towards the end of the file.

Each extra link is an object that needs a __name__ property (how this link will be displayed) and a __href__ property (which url this link will point to.)

For example:

```
export const ADDITIONAL_LINKS = [
  {name: 'Uber Open Source', href: 'https://uber.github.io/'}
]
```
