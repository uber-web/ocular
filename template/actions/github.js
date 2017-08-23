import fetch from 'fetch';
import {PROJECT_ORG, PROJECT_NAME} from 'config';
import {fetchingGithub, githubError, githubSuccess} from 'reducers/github';

const BASE = 'https://api.github.com';

const getHeaders = () => ({
  // Wow such a hacker stealing a key with no scope!! :''')
  Authorization: `Basic ${btoa('Apercu:e9b35271b05350f0dd7a33fd49ab661e0d41fd2c')}`,
});

export const fetchInfos = () => async dispatch => {

  dispatch(fetchingGithub());

  try {
    const headers = getHeaders();
    const repo = await fetch(`${BASE}/repos/${PROJECT_ORG}/${PROJECT_NAME}`, {headers});
    const c = await fetch(`${BASE}/repos/${'uber'}/${'deck.gl'}/contributors`, {headers});
    const contributors = c.slice(0, 16);
    dispatch(githubSuccess({repo, contributors}));
  } catch (e) {
    dispatch(githubError(e.message));
  }

};
