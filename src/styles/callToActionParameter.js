import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import CONFIG from './_CONFIG';

export default callToActionParameterStyle = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: CONFIG.deviceWidth,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 60,
  },
  icon: {
    alignSelf: 'center',
    width: 44,
    height: 44,
  },
  text: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 180,
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: CONFIG.fontFamily,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
});
