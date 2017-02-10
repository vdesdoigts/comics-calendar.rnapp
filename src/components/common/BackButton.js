import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import navbarStyle from '../../styles/navbarStyle';

export default class BackButton extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.timeout = null;
    this.preventDoubleTap = false;
    this.state = {
      pressIn: false,
    };
  }

  onPress() {
    const { navigator } = this.props;

    if (!this.preventDoubleTap) navigator.pop();
    this.preventDoubleTap = true;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.preventDoubleTap = false;
    }, 800);
  }

  onPressIn() {
    this.setState({ pressIn: true });
  }

  onPressOut() {
    this.setState({ pressIn: false });
  }

  render() {
    const path = require('../../../assets/images/backButton-white.png');

    return (
      <TouchableHighlight
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        activeOpacity={0.6}
        underlayColor='transparent'
        style={[navbarStyle.button, navbarStyle.leftButton]}
      >
        <Image source={path} width="44" height="44" />
      </TouchableHighlight>
    );
  }
}
