import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import ParameterContainer from '../components/ParameterContainer';

class ParameterScreen extends Component {

  render() {
    return <ParameterContainer {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    editor: {
      editorList: state.editorList,
    },
    // collection: {
    //   collectionList: state.collectionList,
    // },
    // localCollection: {
    //   localCollectionKeys: state.localCollection,
    // },
    // localBook: {
    //   localBookKeys: state.localBook,
    // }
  };
}

export default connect(mapStateToProps)(ParameterScreen);
