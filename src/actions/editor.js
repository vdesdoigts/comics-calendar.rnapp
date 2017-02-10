'use strict';

import { EDITOR } from '../constant';
import Channel from '../channel';

const getEditorList = () => {
  return (dispatch, getStore) => {
    if (getStore().editorList.isLoaded) {
      return Promise.resolve(dispatch({
        type: EDITOR.LIST,
        data: getStore().editorList.data
      }));
    }

    const channel = new Channel();
    return channel.getEditorList((data) => {
      return dispatch({
        type: EDITOR.LIST,
        data: data.data
      });
    });
  }
};

export default {
  getEditorList,
};
