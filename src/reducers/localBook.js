'use strict';

import createReducer from '../utils/create-reducer';
import { LOCAL_BOOK } from '../constant';

const initialState = {
  isLoaded: false,
  data: [],
}

const actionHandler = {
  [LOCAL_BOOK.KEYS]: (state, action) => {
    return {
      isLoaded: true,
      data: action.data,
    };
  },

  [LOCAL_BOOK.ADD]: (state, action) => {
    let newArray = state.data.slice();

    // action.data doit renvoyer le nom et plus un tableau
    // Tester si le nom est déjà présent
    // if ( newArray[action.data] === undefined ) {
    //   newArray.push(action.data);
    // }

    return {
      ...state,
      data: action.data,
    };
  },

  [LOCAL_BOOK.REMOVE]: (state, action) => {

    return {
      ...state,
      data: action.data,
    };
  }
}

export default createReducer(initialState, actionHandler);
