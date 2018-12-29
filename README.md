# Ocular

Ocular is a tool primarily designed for building documentation websites for github-based javascript frameworks, built using the gatsbyjs documentation generation system.

This documentation is for the newer gatsby-based version of ocular. In addition to the gatsbyjs-based generator, Ocular also support a "classic" variant for backwards compatibility. The classic version is not maintained and new sites should be built using the gatsbyjs-based generator. See documentation on [github]().


Using ocular in your framework requires:
* a directory with github markdown
* examples...


### Install

    yarn add ocular -D

### Usage

    ocular start

Starts the website

    ocular build

Generate the dist

    ocular lint

Starts linting process


### Create

> These instructions refer to the classic versions

To create a project using ocular, a command fits this purpose.

Before getting started, create a directory, and go in there

    mkdir yolo && $_

Then create a basic `package.json`

    npm init -y

You can now install `ocular` as a devDep

    yarn add -D ocular

And finally launch the cli

    ./node_modules/.bin/ocular init

### Examples

- [react-vis](https://github.com/uber/react-vis)
- [vis-tutorial](https://github.com/uber-common/vis-tutorial)
- [vis-academy](https://github.com/uber-common/vis-academy)
- [math.gl](https://github.com/uber-web/math.gl)


### Why

This project was originally created in order to avoid copy and pasting the website
of deck.gl into new projects and provide an easy and clean way to bootstrap one while keeping
most of the config in one place, that could allow for fixes across ocularized projects.

Most of the magic of Ocular resides in the `resolve` rule of the webpack config, which
basically takes the project files at first and fallbacks to Ocular's. This way, you can
override every single file required by this CRA-like application.
