import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import EditorContainer from '../components/EditorContainer';

class EditorScreen extends Component {

  render() {
    return <EditorContainer {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    localCollection: {
      localCollectionKeys: state.localCollection,
    },
  };
}

export default connect(mapStateToProps)(EditorScreen);
