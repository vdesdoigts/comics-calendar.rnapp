import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default navbarStyle = StyleSheet.create({
  defaultNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 44,
    backgroundColor: CONFIG.brandColor,
  },
  title: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 20,
    fontWeight: '400',
  },
  button : {
    width: 44,
    height: 44,
  },
  leftButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  comicsNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    height: 44,
    backgroundColor: CONFIG.brandColor,
  },
});
