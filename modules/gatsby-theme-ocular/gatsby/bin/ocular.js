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
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs')
let ghpages;
let inquirer;
let slug;

try {
  ghpages = require('gh-pages');
  inquirer = require('inquirer');
  slug = require('slug');
} 
catch (e) {
  // if either ghpages, inquirer or slug can't be found
  // it's not the end of the world until they are used
  console.log(e);
}

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
];

const OCULAR_CONFIG_TEMPLATE = require(`${TEMPLATE_DIR}/ocular-config-template.js`)

// TODO/ib - autogenerate table-of-contents.json
// const { listDocs, buildMdRoutes, buildSitemap } = require('./utils/build-docs')

const commands = {
  init() {
    if (inquirer === undefined) {
      console.log('please install inquirer (ie yarn add inquirer, npm install inquirer');
      return;
    }
    if (slug === undefined) {
      console.log('please install slug (ie yarn add slug, npm install slug');
      return;
    }
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
          message: 'Where is the website folder relative to your main project?',
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

        result.websiteFolder = process.env.PWD;
        execSync('mkdir -p src/components static/images styles');

        const CURRENT_PACKAGE_JSON = require(`${DIR_PATH}/package.json`)

        let license = CURRENT_PACKAGE_JSON.license;

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
        const UPDATED_PACKAGE_JSON = require(`${DIR_PATH}/package.json`)
        UPDATED_PACKAGE_JSON.name = slug(result.name);
        UPDATED_PACKAGE_JSON.description = result.desc;

        if (license !== '') {
          UPDATED_PACKAGE_JSON.license = license;
        }

        writeFileSync(`${DIR_PATH}/package.json`, `${JSON.stringify(UPDATED_PACKAGE_JSON, null, 2)}\n`)
        
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
  */
  'build-toc'() {
    let ocularConfig = require(`${DIR_PATH}/ocular-config.js`);
    const docFolder = ocularConfig.DOC_FOLDER;
    const listOfDocs = listDocs(docFolder);
    const toc = buildToc(listOfDocs);
    writeFileSync(`${docFolder}/table-of-contents.json`, toc);
  },
  

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
  return commands.help();
}

commands[command]();
return 1;

function listDocs(docsSrcPath) {
  const queue = readdirSync(docsSrcPath).map(fileName => ({
    fileName,
    path: []
  }))
  const docs = [];
  while (queue.length) {
    const { fileName, path } = queue.pop();
    const fullPath = normalize(
      [docsSrcPath]
        .concat(path)
        .concat(fileName)
        .join('/')
    );

    if (lstatSync(fullPath).isDirectory() === false) {
      if (extname(fileName) === '.md') {
        const docBaseName = basename(fileName, '.md');
        const slug = path.concat(docBaseName).join('/');
        docs.push({
          docBaseName,
          slug,
          path
        });
      }
      // ignore non .md files
    } else {
      const newPath = path.concat(fileName);
      const newFullPath = [docsSrcPath].concat(newPath).join('/');
      readdirSync(newFullPath).forEach(f => {
        queue.push({ fileName: f, path: newPath });
      })
    }
  }
  return docs;
}

function buildToc(docs, nameOfDefaultChapter = 'Overview', baseUrl = 'docs') {
  return docs
    .sort((a, b) => (a.fullPath > b.fullPath ? 1 : -1))
    .reduce((result, doc) => {
      
      let url = baseUrl;
      // removes accidental '//'s
      const slug = `${baseUrl}/${doc.slug}`.replace(/\/\//g, '/');

      // we'll look where to add each entry
      let location;

      // we'll create chapters in the TOC if needs be
      const chapterKey = doc.path.length ? sentence(doc.path[0]) : nameOfDefaultChapter;
      
      if (!result.chapters.find(chapter => chapter.title === chapterKey)) {
        result.chapters.push({title: chapterKey, entries: []});
      }

      // we'll update location depending on the path of each entry,
      // creating new sections as we go if needed

      location = result.chapters.find(chapter => chapter.title === chapterKey);
      doc.path.slice(1).forEach(folder => {
        const entryKey = sentence(folder);
        if (!location.entries.find(entry => entry.title === entryKey)) {
          location.entries.push({title: entryKey, entries: []});
        }
        location = location.entries.find(entry => entry.title === entryKey);
      });

      location.entries.push({entry: `${baseUrl}${doc.slug}`});
      
      return result;
    }, {
      chapters: [],
      id: 'table-of-contents'
    });
}

