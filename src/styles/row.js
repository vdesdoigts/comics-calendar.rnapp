import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default rowStyle = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  rowContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 14,
    paddingRight: 22,
    paddingBottom: 14,
    paddingLeft: 22,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: CONFIG.borderColor,
  },
  title: {
    color: CONFIG.textColor,
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 16,
    fontWeight: '400',
  },
  subtitle: {
    color: CONFIG.textColor,
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 10,
    fontWeight: '400',
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    backgroundColor: '#fff',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CONFIG.brandColor,
  },
  checkboxOn: {
    backgroundColor: CONFIG.brandColor,
  },
  checkboxOff: {
    backgroundColor: '#fff',
  }
});
