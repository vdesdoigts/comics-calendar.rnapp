import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default sectionHeaderStyle = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: CONFIG.sectionHeaderHeight,
    backgroundColor: CONFIG.brandColor,
  },
  sectionHeaderText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: CONFIG.fontFamilyAlt,
    fontSize: 20,
    fontWeight: '300',
  }
});
