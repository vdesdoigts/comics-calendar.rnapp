import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import logger from './src/middleware/logger';
import thunk from 'redux-thunk';
const createStoreWithMW = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMW(reducers);

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/root';
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'comicscalendar.EditorScreen',
    title: 'Navigation',
    navigatorStyle: {
      navBarHidden: true,
      statusBarHidden: true,
    }
  },
  portraitOnlyMode: true
});

