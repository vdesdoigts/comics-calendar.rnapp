import { Navigation } from 'react-native-navigation';
import BookScreen from './screens/BookScreen';
import BooksScreen from './screens/BooksScreen';
import CollectionScreen from './screens/CollectionScreen';
import EditorScreen from './screens/EditorScreen';
import ParameterScreen from './screens/ParameterScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('comicscalendar.BookScreen', () => BookScreen, store, Provider);
  Navigation.registerComponent('comicscalendar.BooksScreen', () => BooksScreen, store, Provider);
  Navigation.registerComponent('comicscalendar.CollectionScreen', () => CollectionScreen, store, Provider);
  Navigation.registerComponent('comicscalendar.EditorScreen', () => EditorScreen, store, Provider);
  Navigation.registerComponent('comicscalendar.ParameterScreen', () => ParameterScreen, store, Provider);
}
