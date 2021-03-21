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

const {existsSync, readFileSync, writeFileSync} = require('fs');

const SOURCE_DIR = `${__dirname}/..`;
const DIR_PATH = process.env.PWD;

// copy required files for migration
const FILENAMES = [
  {
    dir: `${SOURCE_DIR}/website-template`,
    filename: 'gatsby-browser.js',
    keepFresh: false,
  },
  {
    dir: `${SOURCE_DIR}/website-template`,
    filename: 'gatsby-config.js',
    keepFresh: false,
  },
  {
    dir: `${SOURCE_DIR}/website-template`,
    filename: 'gatsby-ssr.js',
    keepFresh: false,
  },
  // always keep site-query.jsx fresh
  {
    dir: `${SOURCE_DIR}`,
    filename: 'src/components/site-query.jsx',
    keepFresh: true,
  },
];

for (const f of FILENAMES) {
  const targetPath = `${DIR_PATH}/${f.filename}`;
  // copy the file if it doesn't exist
  if (f.keepFresh || !existsSync(targetPath)) {
    const sourcePath = `${f.dir}/${f.filename}`;
    const file = readFileSync(`${f.dir}/${f.filename}`);
    console.log(`Migrating '${targetPath}'.`);
    writeFileSync(targetPath, file);
  } else {
    console.log(`Skip '${targetPath}'' for migration.`);
  }
}

return 1;
