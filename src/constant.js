export const EDITOR = {
  LIST: 'PLAYER.LIST',
};

export const COLLECTION = {
  LIST: 'COLLECTION.LIST',
};

export const LOCAL_COLLECTION = {
  KEYS: 'LOCAL_COLLECTION.KEYS',
  ADD: 'LOCAL_COLLECTION.ADD',
  REMOVE: 'LOCAL_COLLECTION.REMOVE',
};

export const LOCAL_BOOK = {
  KEYS: 'LOCAL_BOOK.KEYS',
  ADD: 'LOCAL_BOOK.ADD',
  REMOVE: 'LOCAL_BOOK.REMOVE',
};

export const MOCKED_EDITOR_DATA = [
  {
    name: 'Marvel',
    canonicalName: 'marvel',
    logo: require('../assets/images/logo-marvel.png'),
    cover: require('../assets/images/landingpage-marvel.jpg'),
    backgroundColor: 'yellow',
  },
  {
    name: 'DC Comics',
    canonicalName: 'dc_comics',
    logo: require('../assets/images/logo-dccomics-white.png'),
    cover: require('../assets/images/landingpage-dccomics.jpg'),
    backgroundColor: 'purple',
  }
];
