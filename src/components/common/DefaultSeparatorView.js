import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import rowStyle from '../../styles/row';

export default class DefaultSeparatorView extends Component {

  render() {
    return <View style={rowStyle.rowSeparator} />;
  }
}
