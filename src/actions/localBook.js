'use strict'

import { LOCAL_BOOK } from '../constant';
import Channel from '../channel';

const getLocalBooks = () => {
  return (dispatch, getStore) => {
    if (getStore().localBook.isLoaded) {
      return Promise.resolve(dispatch({
        type: LOCAL_BOOK.KEYS,
        data: getStore().localBook.data,
      }));
    }

    const channel = new Channel();
    return channel.getLocalBooks((data) => {
      return dispatch({
        type: LOCAL_BOOK.KEYS,
        data: data || [],
      });
    });
  }
}

const addBook = (collection) => {
  return (dispatch, getStore) => {
    const channel = new Channel();
    return channel.addBook(collection, (data) => {
      return dispatch({
        type: LOCAL_BOOK.ADD,
        data: data,
      });
    });
  }
}

const removeBook = (collection) => {
  return (dispatch, getStore) => {
    const channel = new Channel();
    return channel.removeBook(collection, (data) => {
      return dispatch({
        type: LOCAL_BOOK.REMOVE,
        data: data,
      });
    });
  }
}

export default {
  getLocalBooks,
  addBook,
  removeBook,
}
