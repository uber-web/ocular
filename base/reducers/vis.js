import {handleActions} from 'redux-actions';

import {normalizeParam} from 'utils/format';

const initialState = {
  owner: null,
  meta: {},
  data: null,
  params: {},
};

export const updateParam = (name, value) => ({type: 'UPDATE_PARAM', payload: {name, value}});

export default handleActions({

  USE_PARAMS: (state, action) => {

    const params = Object.keys(action.params)
      .reduce((acc, name) => {
        acc[name] = normalizeParam(action.params[name]);
        return acc;
      }, {});

    return {...state, params};

  },

  UPDATE_PARAM: (state, action) => {
    const {name, value} = action.payload;
    const newParams = {};
    const p = state.params[name];
    if (p) {
      newParams[name] = normalizeParam({...p, value});
      return {
        ...state,
        params: {...state.params, ...newParams},
      };
    }
    return state;
  },

}, initialState);
