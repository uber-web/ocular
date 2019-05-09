# Deploying

Deploying your ocular-gatsby page to the `gh-pages` branch is easy. Just install `gh-pages` and add the following script to your website's package.json.

```bash
yarn add -D gh-pages
```

Then just build and deploy.

```
gatsby build
NODE_DEBUG=gh-pages gh-pages -d public
```


## Automating

You can just add a `yarn deploy` script to your website as follows:

```json
  "scripts": {
    "deploy": "NODE_DEBUG=gh-pages gh-pages -d public"
  },
  },
  "devDependencies": {
    "gh-pages": "^2.0.1",
  }
}
```

You could optionally run a build before the deploy.


## Remarks

* The `NODE_DEBUG=gh-pages` prefix in the script is optional, it provides a bit more logging in case something goes wrong.