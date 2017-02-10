import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default buttonStyle = StyleSheet.create({
  button: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 30,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 15,
    backgroundColor: CONFIG.brandColor,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 14,
    fontWeight: '300',
  },
  buttonLoadMore: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#4A4A4A',
  },
  buttonLoadMoreText: {
    alignSelf: 'center',
    width: 180,
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: CONFIG.fontFamily,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  }
});
