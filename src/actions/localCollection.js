'use strict'

import { LOCAL_COLLECTION } from '../constant';
import Channel from '../channel';

const getLocalCollections = () => {
  return (dispatch, getStore) => {
    if (getStore().localCollection.isLoaded) {
      return Promise.resolve(dispatch({
        type: LOCAL_COLLECTION.KEYS,
        data: getStore().localCollection.data,
      }));
    }

    const channel = new Channel();
    return channel.getLocalCollections((data) => {
      return dispatch({
        type: LOCAL_COLLECTION.KEYS,
        data: data || [],
      });
    });
  }
}

const addCollection = (collection) => {
  return (dispatch, getStore) => {
    const channel = new Channel();
    return channel.addCollection(collection, (data) => {
      return dispatch({
        type: LOCAL_COLLECTION.ADD,
        data: data,
      });
    });
  }
}

const removeCollection = (collection) => {
  return (dispatch, getStore) => {
    const channel = new Channel();
    return channel.removeCollection(collection, (data) => {
      return dispatch({
        type: LOCAL_COLLECTION.REMOVE,
        data: data,
      });
    });
  }
}

export default {
  getLocalCollections,
  addCollection,
  removeCollection
}
