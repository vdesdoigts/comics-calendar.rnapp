'use strict';

import createReducer from '../utils/create-reducer';
import { COLLECTION } from '../constant';

const initialState = {
  isLoaded: false,
  data: [],
}

const actionHandler = {
  [COLLECTION.LIST]: (state, action) => {
    return {
      isLoaded: true,
      data: action.data
    }
  }
}

export default createReducer(initialState, actionHandler);
