# Customizing fonts

By default, Ocular imports the Source Sans Pro, an Adobe open-source font, from Google fonts. This is done in the __\_typography.scss__ file (that's all it does).

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

In the __\_variables.scss__ file, you should also change the $font-family variable (default: "Source Sans Pro") if you don't want ot use that font, whether you're loading a custom one in __\_typography.scss__ or not. 

For instance:

```
$font-family: "my cool online font";
```

```
$font-family: sans-serif;
```
