# Quick start

## Installing Ocular

From the project you want to create a website for, create a new folder:

```
mkdir website
```

Initialize that folder as a new project with its own package.json.

From now on, we'll call that folder you've just created the Ocular folder.

```
npm init -y
```

then install Ocular as a devDependency.

```
yarn add -D gatsby-theme-ocular
```
or
```
npm install gatsby-theme-ocular --save-dev
```

## Creating and running your Ocular website

Now, start the Ocular project:

```
ocular init
```

This will prompt you with a few questions, and create a number of files and folders in the Ocular folder.
The most important of these file is `gatsby-config.js` in the Ocular folder, which contains all the settings for your website. You can edit it later.

Now install any remaining packages:
```
yarn
```
or
```
npm install
```

Your project will need a `table-of-contents.json` file in the same location you have your documentation files. You can create one manually but Ocular can also create one for you by typing: 
```
yarn build-toc
```
or
```
npm run build-toc
```

At this stage, you can see your website by typing:

```
yarn start
```
or
```
npm run start
```

## Writing content

You're going to need documentation files for your documentation website.
Your `gatsby-config.js` file will contain the location of these files. Read [Writing documentation](./creating-content/writing-documentation) to know all about that part.
And your documentation files will be available on your website!

## Publishing your website

That's all you need if you just want to have your website running on your machine. But if you want to have your site running somewhere else, such as GitHub, that's not enough.

From the ocular folder, type

```
yarn build
```
or
```
npm run build
```
And this will generate a static website in the folder `public` (a sub-folder of your Ocular folder) 
You can go to that folder and test your built website by typing
```
yarn serve
```
or
```
npm run serve
```

You can now safely upload the contents of this folder on a web server. If you want to deploy this website to Github Pages, and your project is already hosted on github, you can instead type:

```
yarn deploy
```
or
```
npm run deploy
```
