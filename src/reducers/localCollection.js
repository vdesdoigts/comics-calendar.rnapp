'use strict';

import createReducer from '../utils/create-reducer';
import { LOCAL_COLLECTION } from '../constant';

const initialState = {
  isLoaded: false,
  data: [],
}

const actionHandler = {
  [LOCAL_COLLECTION.KEYS]: (state, action) => {
    return {
      isLoaded: true,
      data: action.data,
    };
  },

  [LOCAL_COLLECTION.ADD]: (state, action) => {
    let newArray = state.data.slice();

    // action.data doit renvoyer le nom et plus un tableau
    // Tester si le nom est déjà présent

    return {
      ...state,
      data: action.data,
    };
  },

  [LOCAL_COLLECTION.REMOVE]: (state, action) => {

    return {
      ...state,
      data: action.data,
    };
  }
}

export default createReducer(initialState, actionHandler);
