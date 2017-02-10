import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookContainer from '../components/BookContainer';

class BooksScreen extends Component {

  render() {
    return <BookContainer {...this.props} />;
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
