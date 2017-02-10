import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import navbarStyle from '../../styles/navbarStyle';

class ParameterButton extends Component {

  constructor(props) {
    super(props);

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.state = {
      pressIn: false,
    };
  }

  onPressIn() {
    this.setState({ pressIn: true });
  }

  onPressOut() {
    this.setState({ pressIn: false });
  }

  render() {
    const { navigator } = this.props;
    const path = this.state.pressIn ? require('../../../assets/images/parameters-primary.png') : require('../../../assets/images/parameters-gray.png');

    return (
      <TouchableHighlight
        onPress={() => navigator.push({ screen: 'comicscalendar.ParameterScreen', title: 'Parameter', navigatorStyle: { navBarHidden: true, statusBarHidden: true }})}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        underlayColor='transparent'
        style={[navbarStyle.button, navbarStyle.rightButton]}
      >
        <Image source={path} width='44' height='44' />
      </TouchableHighlight>
    );
  }
}

export default connect()(ParameterButton);
