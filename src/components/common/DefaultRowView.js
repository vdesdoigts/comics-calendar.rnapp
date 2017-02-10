import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import rowStyle from '../../styles/row';

export default class DefaultRowView extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.timeout = null;
    this.preventDoubleTap = false;
  }

  onPress() {
    const { row } = this.props;

    if (!this.preventDoubleTap) row.action();
    this.preventDoubleTap = true;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.preventDoubleTap = false;
    }, 800);
  }

  render() {
    const { row } = this.props;

    return (
      <TouchableHighlight underlayColor="#f7f7f7" onPress={this.onPress} style={rowStyle.row}>
        <View style={rowStyle.rowContent}>
          <Text style={rowStyle.title}>{row.label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

DefaultRowView.propTypes = {
  row: PropTypes.object,
}
