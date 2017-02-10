import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import AnimatedSpinnerView from './AnimatedSpinnerView';
import loadingStyle from '../../styles/loading';

export default class LoadingView extends Component {

  render() {
    const {
      backgroundImage,
      spinnerImage,
      fullscreen,
      overlay,
    } = this.props;
    const containerPosition = fullscreen ? loadingStyle.fullscreen : loadingStyle.mask;

    return (
      <View style={[loadingStyle.container, containerPosition]}>
        {overlay &&
          <View style={loadingStyle.overlay} />
        }
        {backgroundImage &&
          <Image
            source={backgroundImage}
            style={loadingStyle.backgroundImage}
          />
        }
        <AnimatedSpinnerView image={spinnerImage} style={loadingStyle.spinner} />
      </View>
    );
  }
}

LoadingView.propTypes = {
  backgroundImage: PropTypes.any,
  spinnerImage: PropTypes.any,
  fullscreen: PropTypes.bool,
  overlay: PropTypes.bool,
}

LoadingView.defaultProps = {
  backgroundImage: null,
  spinnerImage: require('../../../assets/images/loader-white.png'),
  fullscreen: true,
  overlay: false,
}
