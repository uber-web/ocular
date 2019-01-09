# Quick start
## Installing Ocular
From the project you want to create a website for, create a new folder:

```
mkdir website && $_
```

Initialize that folder as a new project with its own package.json.

From now on, we'll call that folder you've just created the Ocular folder.

```
npm init -y
```

then install Ocular as a devDependency.

```
yarn add -D ocular-gatsby
```

## Creating and running your Ocular website

Now, start the ocular project:

```
ocular init
```

This will create a number of files and folders in the ocular folder.


Now install any remaining packages:
```
yarn
```

At this stage, you can see your website by typing:

```
ocular develop
# or
gatsby develop
```

## Writing content

Next, create documentation files. From the ocular folder, the folder /src/docs/ contains one single .md file, getting-started.md. Add as many files as you want, organize them in folders as you wish...

When you're done, from the ocular folder, type

```
ocular build-docs
```

And your documentation files will be available on your website!

## Publishing your website

That's all you need if you just want to have your website running on your machine. But if you want to have your site running somewhere else, such as GitHub, that's not enough.

From the ocular folder, type

```
ocular build
```

And this will generate a static website in the folder /dist/. You can now safely upload the contents of this folder on a web server. If you have created your ocular folder inside the folder of a GitHub repository, you can also type

```
ocular publish
```

This will copy your static file to the /docs/ folder of the level above, which is perfect to publish directly on GitHub Pages.
