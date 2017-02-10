import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import sectionHeaderStyle from '../../styles/sectionHeader';

export default class SectionHeader extends Component {

  render() {
    const { title } = this.props;

    return (
      <View style={headerStyle.sectionHeader}>
        <Text style={headerStyle.sectionHeaderText}>{title}</Text>
      </View>
    );
  }
}
