import { StyleSheet } from 'react-native';
import CONFIG from './_CONFIG';

export default editorRowViewStyle = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    width: 120,
    resizeMode: 'contain',
  },
});
