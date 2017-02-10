import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import headerStyle from '../../styles/header';

export default class EditorHeaderView extends Component {

  render() {
    return (
      <View style={headerStyle.imprintHeaderContainer}>
        <View style={headerStyle.imprintHeaderContent}>
          <Image  source={require('../../../assets/images/logo.png')} width={140} height={100} />
        </View>
      </View>
    );
  }
}
