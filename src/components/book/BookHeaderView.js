import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import bookHeaderStyle from '../../styles/bookHeader';

export default class BookHeaderView extends Component {

  render() {
    const { editor } = this.props;

    return (
      <View style={bookHeaderStyle.container}>
        <Image source={editor.cover} style={bookHeaderStyle.cover} />
        <View style={bookHeaderStyle.logoContainer}>
          <Image source={editor.logo} style={bookHeaderStyle.logo} />
        </View>
      </View>
    );
  }
}

BookHeaderView.propTypes = {
  editor: PropTypes.object,
}
