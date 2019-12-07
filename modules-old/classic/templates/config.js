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

module.exports = res => `export const PROJECT_TYPE = '${res.type}';

export const PROJECT_NAME = '${res.name}';
${res.type === 'github' ? `export const PROJECT_ORG = \'${res.org}\';` : ''}
export const PROJECT_URL = ${res.type === 'github' ? '`https://github.com/${PROJECT_ORG}/${PROJECT_NAME}`' : `'${res.otherUrl}'`};
export const PROJECT_DESC = '${res.desc}';

export const GITHUB = ${res.type === 'github'};

export const PROJECTS = {};

export const FOOTER_LOGO = '';

export const HOME_PATH = '/';
export const HOME_HEADING = '${res.desc}';

export const HOME_RIGHT = null;

export const HOME_BULLETS = [{
  text: 'Designed for React',
  desc: 'Seamless integration.',
  img: 'images/icon-react.svg',
}, {
  text: 'Totally ready for production',
  img: 'images/icon-layers.svg',
}];

export const ADDITIONAL_LINKS = [];
export const LINK_TO_GET_STARTED = '/docs/developer-guide/get-started';

export const GA_TRACKING = null;

// For showing star counts and contributors.
// Should be like btoa('YourUsername:YourKey') and should be readonly.
export const GITHUB_KEY = null;
`
