import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionContainer from '../components/CollectionContainer';

class CollectionScreen extends Component {

  render() {
    return <CollectionContainer {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    localCollection: {
      localCollectionKeys: state.localCollection,
    },
  };
}

export default connect(mapStateToProps)(CollectionScreen);
