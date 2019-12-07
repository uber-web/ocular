# Customizing fonts

By default, Ocular imports the Source Sans Pro, an Adobe open-source font, from Google fonts. This is done in the __/_typography.scss__ file.

If you want to use another font, you should replace this file either by an empty file (so that you don't import a resource you won't use) or by statements that will import another one, such as @import or @font-face. 

For instance, you can have a custom font file in your __/static/__  folder:

_typography.scss
```
@font-face {
  font-family: "my awesome font";
  src: url(myAwesomeFont.ttf);
}
```

Or you can provide an external location. 

_typography.scss
```
@font-face {
  font-family: "my cool online font";
  src: url("https://coolfontz.com/my-cool-online-font.ttf");
}
```

You can provide as many @font-face statements as you need, for instance if you need to load several files for different weights or styles. 

__/_typography.scss__ also contains the default font size and line height of the website. Feel free to over ride it: 

```
body {
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, sans-serif !important;
  font-size: 16px;
  line-height: 24px;
}
```
