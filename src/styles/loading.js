import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default loadingStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    width: CONFIG.deviceWidth,
    height: CONFIG.deviceHeight,
  },
  fullscreen: {
    top: 0,
  },
  mask: {
    top: 0,
    height: CONFIG.deviceHeight - CONFIG.sectionHeaderHeight,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: CONFIG.deviceWidth,
    height: CONFIG.deviceHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: CONFIG.deviceWidth,
    height: CONFIG.deviceHeight,
    resizeMode: 'cover',
  },
  title: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 20,
    fontWeight: '400',
  },
  spinner: {
    width: 50,
    height: 50,
  },
  spinnerRow: {
    alignSelf: 'center',
    width: 26,
    height: 26,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#fff',
  },
});
