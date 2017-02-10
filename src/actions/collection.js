'use strict'

import { COLLECTION } from '../constant';
import Channel from '../channel';

const getCollectionList = (editor) => {
  return (dispatch, getStore) => {
    if (getStore().collectionList.isLoaded) {
      return Promise.resolve(dispatch({
        type: COLLECTION.LIST,
        data: getStore().collectionList.data
      }));
    }

    const channel = new Channel();
    return channel.getCollectionsByEditor(editor, (data) => {
      return dispatch({
        type: COLLECTION.LIST,
        data: data.data,
      });
    });
  }
}

export default {
  getCollectionList,
}
