import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  Image,
} from 'react-native';

var TIMES = 400;

export default class AnimatedSpinnerView extends Component {

  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.state = {
      angle: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.state.angle.setValue(0);
    this._anim = Animated.timing(this.state.angle, {
      toValue: 360*TIMES,
      duration: 800*TIMES,
      easing: Easing.linear
    }).start(this.animate);
  }

  render() {
    const { image, style } = this.props;

    return (
      <Animated.Image
        source={image}
        style={[
          style,
          {transform: [
            {rotate: this.state.angle.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })},
          ]}]}
      />
    );
  }
}

AnimatedSpinnerView.propTypes = {
  image: PropTypes.any,
  style: PropTypes.any,
}

AnimatedSpinnerView.defaultProps = {
  image: require('../../../assets/images/loader-white.png'),
}
