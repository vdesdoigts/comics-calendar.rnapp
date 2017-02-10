import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import sectionHeaderStyle from '../../styles/sectionHeader';

export default class SectionHeaderView extends Component {

  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { title } = this.props;

    return (
      <View style={sectionHeaderStyle.sectionHeader}>
        <Text style={sectionHeaderStyle.sectionHeaderText}>{this.capitalizeFirstLetter(title)}</Text>
      </View>
    );
  }
}

SectionHeaderView.propTypes = {
  title: PropTypes.string,
}

SectionHeaderView.defaultProps = {
  title: 'Unknow title',
}
