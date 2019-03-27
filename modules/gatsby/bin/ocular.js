#!/usr/bin/env node
// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const { spawn, execSync } = require('child_process')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const ghpages = require('gh-pages');
const inquirer = require('inquirer')
const slug = require('slug')

// Environment

const DIR_PATH = process.env.PWD;

const DEBUGGING = process.argv.includes('--debug');

const env = Object.assign(process.env, {
  DIR_PATH,
  DEBUGGING
});

const TEMPLATE_DIR = `${__dirname}/../website-template`;

// Files to copy

const FILENAMES = [
  'gatsby-browser.js',
  'gatsby-config.js',
  'gatsby-node.js',
  'gatsby-ssr.js',
  'package.json',
  '.gitignore',
  '.eslintignore',
  // Better if we can avoid this
  'src/components/static-query.jsx'
];

const PACKAGE_JSON = require(`${TEMPLATE_DIR}/package.json`)

const OCULAR_CONFIG_TEMPLATE = require(`${TEMPLATE_DIR}/ocular-config-template.js`)


// TODO/ib - autogenerate table-of-contents.json
// const { listDocs, buildMdRoutes, buildSitemap } = require('./utils/build-docs')

const commands = {
  init() {
    inquirer
      .prompt([
        {
          name: 'name',
          message: 'What will be the name of your project?',
          validate: v => Boolean(v) || 'You should provide a name.'
        },
        {
          type: 'list',
          choices: ['github', 'other'],
          name: 'type',
          message: 'Where will your project be hosted?'
        },
        {
          name: 'org',
          message: 'Which organisation will host the repo?',
          validate: v => Boolean(v) || 'You should provide an org.',
          when: ({ type }) => type === 'github'
        },
        {
          name: 'otherUrl',
          message: 'What is your project url?',
          validate: v => Boolean(v) || 'You should provide an url.',
          when: ({ type }) => type === 'other'
        },
        {
          name: 'path',
          message: 'Where is the ocular website relative to your main project?',
          default: '/website/',
          validate: v => Boolean(v) || 'You should provide a path'
        },
        {
          name: 'desc',
          message: 'Provide a basic description of your project',
          validate: v => Boolean(v) || 'You should provide a description.'
        }
      ])
      .then(result => {

        result.websiteFolder = PWD;
        execSync('mkdir -p src/components static styles')

        PACKAGE_JSON.name = slug(result.name)
        PACKAGE_JSON.description = result.desc

        // PACKAGE_JSON.scripts = {
        //   clean: 'rm -rf ../docs/*{.js,.css,index.html,appcache,fonts,images}',
        //   start: 'ocular start',
        //   build: 'ocular build',
        //   lint: 'ocular lint',
        //   publish: 'npm run clean && npm run build && mv dist/* ../docs'
        // }
        // writeFileSync(`${DIR_PATH}/package.json`, `${JSON.stringify(PACKAGE_JSON, null, 2)}\n`)

        // Copy files
        for (const filename of FILENAMES) {
          const file = readFileSync(`${TEMPLATE_DIR}/${filename}`);
          console.log('Writing', `${DIR_PATH}/${filename}`, file.slice(20))
          writeFileSync(`${DIR_PATH}/${filename}`, file);
        }

        const ocularConfig = OCULAR_CONFIG_TEMPLATE(result);
        writeFileSync(`${DIR_PATH}/ocular-config.js`, ocularConfig);

        // writeFileSync(`${DIR_PATH}/package.json`, `${JSON.stringify(PACKAGE_JSON, null, 2)}\n`)
        // writeFileSync(`${DIR_PATH}/html.config.js`, htmlConfigTemplate(result))
        // writeFileSync(`${DIR_PATH}/src/docs/getting-started.md`, docTemplate(result))
        // writeFileSync(`${DIR_PATH}/src/mdRoutes.js`, mdRoutesTemplate(result))
        // writeFileSync(`${DIR_PATH}/src/build-routes-options.json`, optionsTemplate(result))
        // writeFileSync(`${DIR_PATH}/src/demos.js`, 'export default {};\n')
        // writeFileSync(`${DIR_PATH}/src/styles/index.scss`, '')
        // writeFileSync(`${DIR_PATH}/src/styles/_variables.scss`, variablesTemplate())
      })
  },

  start() {
    const shouldOpen = process.argv.includes('open');

    spawn(
      `gatsby`,
      [...(shouldOpen ? ['--open'] : [])],
      { cwd: __dirname, stdio: 'inherit', env }
    );
  },

  build() {
    execSync(`rm -rf ${DIR_PATH}/dist`)

    spawn(`gatsby`, [], {
      cwd: __dirname,
      stdio: 'inherit',
      env: Object.assign(env, { NODE_ENV: 'production' })
    })
  },
  // debug() {
  //   execSync(`node --inspect-brk --no-lazy node_modules/gatsby/dist/bin/gatsby develop`);
  // },
  // serve() {
  //   execSync(`node node_modules/gatsby/dist/bin/gatsby serve`);
  // },

  /*
  lint() {
    spawn(`${DIR_PATH}/node_modules/.bin/eslint`, [`${DIR_PATH}/src`, '-c', '.eslintrc'], {
      cwd: __dirname,
      stdio: 'inherit'
    })
  },

  'build-docs'() {
    let options = {
      websitePath: '/website'
    }
    if (existsSync(`${DIR_PATH}/src/build-routes-options.json`)) {
      options = JSON.parse(readFileSync(`${DIR_PATH}/src/build-routes-options.json`))
    }
    const { websitePath, baseurl } = options
    const docsSrcPath = process.argv[3] || options.docsSrcPath || `src/docs/`

    const docs = listDocs(docsSrcPath, websitePath)
    const output = buildMdRoutes(docs, docsSrcPath, websitePath)

    if (baseurl) {
      console.log('generating sitemap')
      const sitemap = buildSitemap(baseurl, docs)
      writeFileSync(`${DIR_PATH}/dist/sitemap.xml`, sitemap)
      writeFileSync(`${DIR_PATH}/dist/robots.txt`, `sitemap: ${baseurl}/sitemap.xml`)
    }
    console.log('upating documentation routes')
    writeFileSync(`${DIR_PATH}/src/mdRoutes.js`, output)
  },
  */

  help() {
    console.log(`
Ocular CLI
----------

Available commands:

- init: create the bootstrap files in the current project
- start: launch webpack in dev mode (accepts 'open' arg)
- build: generate the bundle and dist files

You can provide the --debug flag to print the computed webpack config.
`)
  }
}

const command = process.argv[2]
if (!commands[command]) {
  return commands.help()
}

commands[command]()
return 1
