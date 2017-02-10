import { CONFIG } from '../config';

const api = CONFIG.API_URL;
const d = new Date()
const currentMonth = d.getMonth() + 1
const currentYear = d.getFullYear() + 1;

const address = {

  editorList: () => {
    return `${api}/editors?limit=10&offset=0`;
  },

  /**
   * All comicbooks of editor
   * @params editor: integer
   */
  booksByEditor: (editor, limit, offset,) => {
    return `${api}/books?editor=${editor}&limit=${limit}&offset=${offset}`;
  },

  booksByEditorAndCollectionArray: (editor, collections, limit, offset) => {
    let params = [];

    collections.forEach(function(collection) {
      params.push('collections[]=' + collection);
    });

    return `${api}/books?editor=${editor}&${params.join('&')}&limit=${limit}&offset=${offset}`;
  },

  /**
   * All collection of editor
   * @params editor: integer
   */
  collectionsByEditor: (editor, limit, offset) => {
    return `${api}/collections?editor=${editor}&limit=${limit}&offset=${offset}`;
  },

  /**
   * Editors by collections
   * @params collections: {Array}
   * @example collections: ['superman_saga', 'batman_saga']
   */
  editorsByCollectionArray: (collections) => {
    let params = [];

    collections.forEach(function(collection) {
      params.push('collections[]=' + collection);
    });

    return `${api}/editors?${params.join('&')}`;
  }
}

export default address;
