import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default headerStyle = StyleSheet.create({
  imprintHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: CONFIG.statusBarHeight,
    backgroundColor: '#fff',
  },
  imprintHeaderContent: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 44,
    backgroundColor: CONFIG.brandColor,
  },
  sectionHeaderText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: CONFIG.fontFamily,
    fontSize: 20,
    fontWeight: '400',
  },
  logoContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    resizeMode: 'contain',
  },
  background: {
    height: 300,
    resizeMode: 'cover',
  }
});
