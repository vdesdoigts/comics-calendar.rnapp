import React, { Component, PropTypes } from 'react';
import localBookActions from '../actions/localBook';
import BookDetail from './book/BookDetail';

export default class BookContainer extends Component {

  render() {
    const { dispatch, navigator, item, isChecked, onCheckButtonPress } = this.props;

    return <BookDetail navigator={navigator}
                       item={item}
                       isChecked={isChecked}
                       onCheckButtonPress={onCheckButtonPress}
                       onCheckRow={dispatch(localBookActions.addBook)}
                       onUncheckRow={dispatch(localBookActions.removeBook)} />;
  }
}

BookContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckButtonPress: PropTypes.func.isRequired,
}
