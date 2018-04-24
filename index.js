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
const { lstatSync, readdirSync, writeFileSync } = require('fs')
const inquirer = require('inquirer')
const slug = require('slug')

const configTemplate = require('./templates/config')
const variablesTemplate = require('./templates/variables.scss')
const htmlConfigTemplate = require('./templates/html.config')

const { basename, extname } = require('path')
const { camel, sentence } = require('to-case')

const DIR_PATH = process.env.PWD

const DEBUGGING = process.argv.includes('--debug')

const env = Object.assign(process.env, {
  DIR_PATH,
  DEBUGGING,
})

const commands = {
  init: () => {
    inquirer
      .prompt([
        {
          name: 'name',
          message: 'What will be the name of your project?',
          validate: v => Boolean(v) || 'You should provide a name.',
        },
        {
          type: 'list',
          choices: ['github', 'phab'],
          name: 'type',
          message: 'Where will your project be hosted?',
        },
        {
          name: 'org',
          message: 'Which organisation will host the repo?',
          validate: v => Boolean(v) || 'You should provide an org.',
          when: ({ type }) => type === 'github',
        },
        {
          name: 'phabUrl',
          message: 'What is the phabricator url?',
          validate: v => Boolean(v) || 'You should provide an url.',
          when: ({ type }) => type === 'phab',
        },
        {
          name: 'desc',
          message: 'Provide a basic description of your project',
          validate: v => Boolean(v) || 'You should provide a description.',
        },
      ])
      .then(res => {
        execSync('mkdir -p static src src/styles')

        const json = require(`${DIR_PATH}/package.json`)

        json.name = slug(res.name)
        json.description = res.desc

        json.scripts = {
          start: 'ocular start',
          build: 'ocular build',
          lint: 'ocular lint',
        }

        writeFileSync(`${DIR_PATH}/package.json`, `${JSON.stringify(json, null, 2)}\n`)
        writeFileSync(`${DIR_PATH}/html.config.js`, htmlConfigTemplate(res))
        writeFileSync(`${DIR_PATH}/src/config.js`, configTemplate(res))
        writeFileSync(`${DIR_PATH}/src/mdRoutes.js`, 'export default [];\n')
        writeFileSync(`${DIR_PATH}/src/demos.js`, 'export default {};\n')
        writeFileSync(`${DIR_PATH}/src/styles/index.scss`, '')
        writeFileSync(`${DIR_PATH}/src/styles/_variables.scss`, variablesTemplate())
      })
  },

  start: () => {
    const shouldOpen = process.argv.includes('open')

    spawn(
      `${DIR_PATH}/node_modules/.bin/webpack-dev-server`,
      [...(shouldOpen ? ['--open'] : []), '--config', 'webpack/dev'],
      { cwd: __dirname, stdio: 'inherit', env }
    )
  },

  lint: () => {
    spawn(`${DIR_PATH}/node_modules/.bin/eslint`, [`${DIR_PATH}/src`, '-c', '.eslintrc'], {
      cwd: __dirname,
      stdio: 'inherit',
    })
  },

  build: () => {
    execSync(`rm -rf ${DIR_PATH}/dist`)

    spawn(`${DIR_PATH}/node_modules/.bin/webpack`, ['--config', 'webpack/build'], {
      cwd: __dirname,
      stdio: 'inherit',
      env: Object.assign(env, { NODE_ENV: 'production' }),
    })
  },

  'build-docs': () => {
    const docs = []
    const result = {
      name: 'Documentation',
      path: '/docs',
      data: [],
    }
    let output = ''
    const docsSource = `${DIR_PATH}/src/docs/`
    const queue = readdirSync(`${docsSource}`).map(fileName => ({
      fileName,
      pathString,
      path: ['src', 'docs'],
    }))

    while (queue.length) {
      const { fileName, pathString, path } = queue.pop()
      const fullPath = [DIR_PATH]
        .concat(path)
        .concat(fileName)
        .join('/')

      const componentPath = path
        .slice(1)
        .concat(fileName)
        .join('/')

      if (lstatSync(fullPath).isDirectory() === false) {
        if (extname(fileName) === '.md') {
          const docBaseName = basename(fileName, '.md')
          const componentName = camel(
            path
              .slice(2)
              .concat(docBaseName)
              .join('-')
          )

          docs.push({
            docBaseName,
            fileName,
            componentPath,
            componentName,
            fullPath,
            path
          })
        }
        // ignore non .md files
      } else {
        const newPath = path.concat(fileName)
        const fullPath = [DIR_PATH].concat(newPath).join('/')
        readdirSync(fullPath).forEach(fileName => {
          queue.push({ fileName, path: newPath })
        })
      }
    }

    docs
      .sort((a, b) => (a.fullPath > b.fullPath ? 1 : -1))
      .forEach(({ docBaseName, fileName, componentName, componentPath, path }) => {
        const imp = `import ${componentName} from '${componentPath}'\n`
        output += imp

        const pathSuffix = path.slice(2)
        let destination = result.data
        let currentPath = '/docs'

        pathSuffix.forEach(p => {
          const size = destination.length
          const pathInSentenceCase = sentence(p)
          currentPath = `${currentPath}/${p}`
          let nextLevelIdx = destination.findIndex(d => d.name === pathInSentenceCase)
          if (nextLevelIdx === -1) {
            destination.push({
              name: pathInSentenceCase,
              path: currentPath,
              data: [],
            })
            nextLevelIdx = size
          }
          destination = destination[nextLevelIdx].data
        })

        destination.push({
          name: sentence(docBaseName),
          markDown: componentName,
        })
      })

    const stringifiedResult = JSON.stringify(result, null, 2)
      .replace(/"name"/g, 'name')
      .replace(/"path"/g, 'path')
      .replace(/"data"/g, 'data')
      .replace(/"markDown": "([^"]+)"/g, 'markDown: $1')

    output += '\n'
    output += `export default [${stringifiedResult}];`
    output += '\n'

    writeFileSync(`${DIR_PATH}/src/mdRoutes.js`, output)
  },

  help: () => {
    console.log(`
Ocular CLI
----------

Available commands:

- init: create the bootstrap files in the current project
- start: launch webpack in dev mode (accepts 'open' arg)
- lint: run eslint on the current project
- build: generate the bundle and dist files

You can provide the --debug flag to print the computed webpack config.
`)
  },
}

const command = process.argv[2]
if (!commands[command]) {
  return commands.help()
}

commands[command]()
