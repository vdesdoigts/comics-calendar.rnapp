import {
  Alert,
  AsyncStorage,
  NetInfo
} from 'react-native';
import address from './address';
import I18n from '../../i18n/i18n';

export default class Channel {

  getEditorsByCollections(collectionArray, callback) {
    if (collectionArray.length > 0) {
      const url = address.editorsByCollectionArray(collectionArray);
      this.get(url, callback);
    } else {
      callback({ data: [] });
    }
  }

  getLocalCollections(callback) {
    // AsyncStorage.removeItem('collection');
    AsyncStorage.getItem('collection')
      .then(value => {
        callback(JSON.parse(value));
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      });
  }

  getCollectionsByEditor(editor, limit, offset, callback) {
    const url = address.collectionsByEditor(editor, limit, offset);
    this.get(url, callback);
  }

  getBooksByEditor(editor, limit, offset, callback) {
    const url = address.booksByEditor(editor, limit, offset);
    this.get(url, callback);
  }

  getBooksByEditorAndCollections(editor, collectionArray, limit, offset, callback) {
    const url = address.booksByEditorAndCollectionArray(editor, collectionArray, limit, offset);
    this.get(url, callback);
  }

  getLocalBooks(callback) {
    // AsyncStorage.removeItem('collection');
    AsyncStorage.getItem('book')
      .then(value => {
        callback(JSON.parse(value));
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      });
  }

  addCollection(collection, callback) {
    AsyncStorage.getItem('collection')
      .then(value => {
        let newValue = JSON.parse(value);

        if (value !== null) {
          newValue.push(collection.canonicalName);
        } else {
          newValue = [collection.canonicalName];
        }

        AsyncStorage.setItem('collection', JSON.stringify(newValue))
          .catch(error => console.error('AsyncStorage error: ', error.message))
          .then(() => {
            callback(newValue);
          })
          .done();
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      })
      .done();
  }

  removeCollection(collection, callback) {
    AsyncStorage.getItem('collection')
      .then(value => {
        let newValue = JSON.parse(value);
        const index = newValue.indexOf(collection.canonicalName);

        if (index > -1) {
          newValue.splice(index, 1);
        }

        AsyncStorage.setItem('collection', JSON.stringify(newValue))
          .then(() => {
            callback(newValue);
          })
          .catch(error => {
            console.error('AsyncStorage error: ', error.message);
            return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
          })
          .done();
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      })
      .done();
  }

  getEditorList(callback) {
    const url = address.editorList();
    return this.get(url, callback);
  }

  getCollectionsByEditors(editor, callback) {
    const url = address.collectionsByEditor(editor);
    this.get(url, callback);
  }

  addBook(book, callback) {
    AsyncStorage.getItem('book')
      .then(value => {
        let newValue = JSON.parse(value);

        if (value !== null) {
          newValue.push(book.canonicalName);
        } else {
          newValue = [book.canonicalName];
        }

        AsyncStorage.setItem('book', JSON.stringify(newValue))
          .catch(error => console.error('AsyncStorage error: ', error.message))
          .then(() => {
            callback(newValue);
          })
          .catch(error => {
            console.error('AsyncStorage error: ', error.message);
            return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
          })
          .done();
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      })
      .done();
  }

  removeBook(book, callback) {
    AsyncStorage.getItem('book')
      .then(value => {
        let newValue = JSON.parse(value);
        const index = newValue.indexOf(book.canonicalName);

        if (index > -1) {
          newValue.splice(index, 1);
        }

        AsyncStorage.setItem('book', JSON.stringify(newValue))
          .catch(error => console.error('AsyncStorage error: ', error.message))
          .then(() => {
            callback(newValue);
          })
          .catch(error => {
            console.error('AsyncStorage error: ', error.message);
            return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
          })
          .done();
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
        return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
      })
      .done();
  }

  get(url, callback) {
    // AsyncStorage.clear();

    // NetInfo.isConnected.fetch().then(isConnected => {
    //   if (!isConnected) {

    //     AsyncStorage.getItem(url)
    //       .catch(error => console.warn('error', error))
    //       .then(response => JSON.parse(response))
    //       .then(data => {
    //         if (data !== null) {
    //           callback(data);
    //         } else {
    //           console.warn('No cached data');
    //           // TODO toast
    //         }
    //       })
    //       .done();
    //   } else {
        AsyncStorage.multiGet(['cacheLastModified', 'urls', url], (err, stores) => {
          const cacheLastModified = stores[0][1];
          let urls = JSON.parse(stores[1][1]) || [];
          const data = stores[2][1];

          let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/html',
          };

          if (cacheLastModified !== null && urls.includes(url)) {
            headers['If-Modified-Since'] = new Date(JSON.parse(cacheLastModified));
          }

          fetch(url, {
            method: 'GET',
            headers,
          })
            .then(response => {
              if (response.status == 304) {
                console.log('Response status is 304');
                console.log('Recovered selection from disk');
                callback(JSON.parse(data));
              } else {
                // Cache modified or url not in cache
                if (urls.includes(url)) {
                  // Clear cache
                  urls = [url];
                } else {
                  urls.push(url);
                }

                response.json()
                  .then(data => {
                    this.setAsyncStorage(JSON.stringify(new Date()), JSON.stringify(urls), url, JSON.stringify(data));
                    callback(data);
                  })
                  .done();
              }
            })
            .catch(error => {
              console.log('Fetch error: ', error.message);
              // TODO : gérer les erreurs
              // par exemple si je n'ai pas de cache pour telle info,
              // prévenir l'utilisateur que la connexion a échouée etc
              if (data) {
                callback(JSON.parse(data));
              } else {
                return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
              }
            })
            .done();
        })
        .catch(error => {
          console.error('AsyncStorage error: ', error.message);
          return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
        })
        .done();
  }

  async setAsyncStorage(cacheLastModified, urls, key, data) {
    let multi_set_pairs   = [
      ['cacheLastModified', cacheLastModified],
      ['urls', urls],
      [key, data]
    ];

    try {
      await AsyncStorage.multiSet(multi_set_pairs, (err) => {
        console.log('Update cache and saved selection to disk')
      });
    } catch (error) {
      console.log('AsyncStorage error: ', error.message);
      return Alert.alert(I18n.t('error_happened'), I18n.t('error_later'));
    }
  }
}
