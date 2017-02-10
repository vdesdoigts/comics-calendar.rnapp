import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from "react-native-router-flux";
import moment from 'moment';
import rowStyle from '../../styles/row';
import comicsRow from '../../styles/comicsRow';

export default class BookRowView extends Component {

  constructor(props) {
    super(props);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.onPress = this.onPress.bind(this);
    this.timeout = null;
    this.preventDoubleTap = false;
    this.state = {
      isChecked: this.props.isChecked,
    };
  }

  toggleCheckbox() {
    const { item, onCheckRow, onUncheckRow } = this.props;
    const { isChecked } = this.state;

    if (isChecked) {
      onUncheckRow(item);
      this.setState({ isChecked: false });
    } else {
      onCheckRow(item);
      this.setState({ isChecked: true });
    }
  }

  onPress() {
    const { item, onPress } = this.props;
    const { isChecked } = this.state;

    if (!this.preventDoubleTap) onPress(item, isChecked, this.toggleCheckbox);
    this.preventDoubleTap = true;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.preventDoubleTap = false;
    }, 800);
  }

  render() {
    const { item, onPress } = this.props;
    const { isChecked } = this.state;
    let checkedStatus = isChecked ? rowStyle.checkboxOn : rowStyle.checkboxOff;

    return (
      <View style={rowStyle.row}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={comicsRow.rowContent}>
            {item.issue
              && <Text style={rowStyle.title} numberOfLines={1}>{moment(item.releasedAt.date).format('DD/MM')} - #{item.issue} {item.name} - {item.distributorCollection}</Text>
              || <Text style={rowStyle.title} numberOfLines={1}>{moment(item.releasedAt.date).format('DD/MM')} - {item.name} - {item.distributorCollection}</Text>
            }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.toggleCheckbox()}>
          <View style={rowStyle.checkboxContainer}>
            <View style={[rowStyle.checkbox, checkedStatus]} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

BookRowView.propTypes = {
  item: PropTypes.object,
  isChecked: PropTypes.bool,
  onCheckRow: PropTypes.func,
  onUncheckRow: PropTypes.func,
  onPress: PropTypes.func,
}

BookRowView.defaultProps = {
  onPress: () => {},
}
