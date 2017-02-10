'use strict';

import createReducer from '../utils/create-reducer';
import { EDITOR } from '../constant';

const initialState = {
  isLoaded: false,
  data: [],
}

const actionHandler = {
  [EDITOR.LIST]: (state, action) => {
    return {
      isLoaded: true,
      data: action.data
    }
  }
}

export default createReducer(initialState, actionHandler);
