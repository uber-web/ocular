#!/usr/bin/env node

const { spawn, execSync } = require('child_process')
const { writeFileSync } = require('fs')
const inquirer = require('inquirer')
const slug = require('slug')

const configTemplate = require('./templates/config')
const variablesTemplate = require('./templates/variables.scss')
const htmlConfigTemplate = require('./templates/html.config')

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
      { cwd: __dirname, stdio: 'inherit', env },
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
