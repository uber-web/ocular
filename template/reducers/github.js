import {handleActions, createAction} from 'redux-actions';

const initialState = {

  repo: {},
  contributors: [],

  loading: false,
  loaded: false,
  error: null,

};

export const fetchingGithub = createAction('FETCHING_GITHUB');
export const githubError = createAction('GITHUB_ERROR');
export const githubSuccess = createAction('GITHUB_SUCCESS');

export default handleActions({

  FETCHING_GITHUB: state => ({...state, loading: true}),
  GITHUB_ERROR: (state, {payload: error}) => ({...state, loading: false, loaded: true, error}),
  GITHUB_SUCCESS: (state, {payload: {repo, contributors}}) => ({
    repo,
    contributors,
    loading: false,
    loaded: true,
  }),

}, initialState);
