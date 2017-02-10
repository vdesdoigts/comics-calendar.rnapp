import React, { Component } from 'react';
import { connect } from 'react-redux';
import BooksContainer from '../components/BooksContainer';

class BooksScreen extends Component {

  render() {
    return <BooksContainer {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    localBook: {
      localBookKeys: state.localBook,
    },
  };
}

export default connect(mapStateToProps)(BooksScreen);
