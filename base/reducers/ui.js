import {createAction, handleActions} from 'redux-actions';

const initialState = {
  headerOpacity: 1,
  isMenuOpen: false,
};

export const toggleMenu = createAction('TOGGLE_MENU');
export const setHeaderOpacity = createAction('SET_HEADER_OPACITY');

export default handleActions({

  TOGGLE_MENU: (state, {payload: isMenuOpen}) => ({...state, isMenuOpen}),
  SET_HEADER_OPACITY: (state, {payload: {headerOpacity}}) => state.headerOpacity !== headerOpacity
    ? ({...state, headerOpacity}) : state,

}, initialState);
