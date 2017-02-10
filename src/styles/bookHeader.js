import {
  Dimensions,
  Navigator,
  StyleSheet,
} from 'react-native';
import CONFIG from './_CONFIG';

export default headerStyle = StyleSheet.create({
  container: {
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 120,
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    width: 110,
    resizeMode: 'contain',
  },
  cover: {
    width: CONFIG.deviceWidth,
    height: CONFIG.deviceHeight,
    resizeMode: 'cover',
  }
});
