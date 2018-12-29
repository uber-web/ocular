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

import fetch from 'fetch';
import {PROJECT_ORG, PROJECT_NAME, GITHUB_KEY} from 'config';
import {fetchingGithub, githubError, githubSuccess} from 'reducers/github';

const BASE = 'https://api.github.com';

const getHeaders = () => ({
  Authorization: `Basic ${GITHUB_KEY}`,
});

export const fetchInfos = () => async dispatch => {

  dispatch(fetchingGithub());

  try {
    const headers = getHeaders();
    const repo = await fetch(`${BASE}/repos/${PROJECT_ORG}/${PROJECT_NAME}`, {headers});
    const c = await fetch(`${BASE}/repos/${PROJECT_ORG}/${PROJECT_NAME}/contributors`, {headers});
    const contributors = c.slice(0, 16);
    dispatch(githubSuccess({repo, contributors}));
  } catch (e) {
    dispatch(githubError(e.message));
  }

};
