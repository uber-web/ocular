import {createAction, handleActions} from 'redux-actions';

const initialState = {
  headerOpacity: 1,
  isMenuOpen: false,
  search: {
    results: [],
    query: '',
  },
};

export const toggleMenu = createAction('TOGGLE_MENU');
export const setHeaderOpacity = createAction('SET_HEADER_OPACITY');

export const setSearch = createAction('SET_SEARCH');

export default handleActions({

  TOGGLE_MENU: (state, {payload: isMenuOpen}) => ({...state, isMenuOpen}),
  SET_HEADER_OPACITY: (state, {payload: {headerOpacity}}) => state.headerOpacity !== headerOpacity
    ? ({...state, headerOpacity}) : state,

  SET_SEARCH: (state, {payload: {results, query}}) => ({...state, search: {results, query}}),

}, initialState);
