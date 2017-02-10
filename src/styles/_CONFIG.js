import {
    Dimensions,
    Navigator,
    Platform,
} from 'react-native';

export default CONFIG = {
  brandColor: '#FF2473',
  textColor: '#1A1A1A',
  titleColor: '#1A1A1A',
  grayColor: '#979797',
  borderColor: '#e5e5e5',
  fontFamily: (Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans'),
  fontFamilyAlt: (Platform.OS === 'ios' ? 'Open Sans'  : 'OpenSans'),
  statusBarHeight: Navigator.NavigationBar.Styles.General.StatusBarHeight,
  navBarHeight: Navigator.NavigationBar.Styles.General.NavBarHeight,
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height,
  sectionHeaderHeight: 44,
};

// TODO : find a better way to have fullscreen image (update on rotate isn't working)

