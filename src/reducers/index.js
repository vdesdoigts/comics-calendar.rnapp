'use strict';

import { combineReducers } from 'redux';

import editorList from './editorList';
import collectionList from './collectionList';
import localCollection from './localCollection';
import localBook from './localBook';

const reducers = combineReducers({
  editorList,
  collectionList,
  localCollection,
  localBook,
});

export default reducers;
